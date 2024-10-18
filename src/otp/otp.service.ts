import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MobileNumber } from './mobile-number.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpResponse } from './otp.model';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(MobileNumber)
    private readonly mobileNumberRepository: Repository<MobileNumber>,
  ) {}

  async generateOtp(phoneNumber: string): Promise<OtpResponse> {
    let mobileNumber = await this.mobileNumberRepository.findOne({
      where: { phoneNumber },
    });

    if (!mobileNumber) {
      mobileNumber = new MobileNumber();
      mobileNumber.phoneNumber = phoneNumber;
      mobileNumber.status = 'generated';
    }

    // Update lastLogin time
    mobileNumber.lastLogin = new Date();

    const url = `https://2factor.in/API/V1/e22905d7-a75a-11ec-a4c2-0200cd936042/SMS/${phoneNumber}/AUTOGEN/OTP1`;
    try {
      const response = await axios.get(url);
      const sessionId = response.data.Details;

      mobileNumber.sessionId = sessionId;
      mobileNumber.createdAt = mobileNumber.createdAt || new Date(); // Set createdAt only if not set

      await this.mobileNumberRepository.save(mobileNumber);

      return {
        success: true,
        message: 'OTP generated successfully',
        data: {
          phoneNumber,
          sessionId,
        },
      };
    } catch (error) {
      throw new BadRequestException('Error generating OTP: ' + error.message);
    }
  }

  async verifyOtp(phoneNumber: string, otpCode: string): Promise<OtpResponse> {
    const mobileNumber = await this.mobileNumberRepository.findOne({
      where: { phoneNumber },
    });

    if (!mobileNumber) {
      throw new BadRequestException('Mobile number not found');
    }

    const sessionId = mobileNumber.sessionId;
    const url = `https://2factor.in/API/V1/e22905d7-a75a-11ec-a4c2-0200cd936042/SMS/VERIFY/${sessionId}/${otpCode}`;
    try {
      const response = await axios.get(url);

      if (response.data && response.data.Status === 'Success') {
        mobileNumber.status = 'verified';
        await this.mobileNumberRepository.save(mobileNumber);

        return {
          success: true,
          message: 'OTP verified successfully',
          data: mobileNumber,
        };
      } else {
        throw new BadRequestException('OTP verification failed');
      }
    } catch (error) {
      throw new BadRequestException('Error verifying OTP: ' + error.message);
    }
  }
}