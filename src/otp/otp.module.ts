import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpResolver } from './otp.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileNumber } from './mobile-number.entity';

@Module({
  providers: [OtpService, OtpResolver],
  imports: [TypeOrmModule.forFeature([MobileNumber])],
})
export class OtpModule {}
