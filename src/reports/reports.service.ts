import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportInput } from './dto/create-report.input';
import { Report } from './entities/report.entity';
import { News } from 'src/news/entities/news.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createReportInput: CreateReportInput): Promise<Report> {
    // Check if the provided newsId exists in the News table
    if (createReportInput.newsId) {
      const news = await this.newsRepository.findOneBy({
        id: createReportInput.newsId,
      });
      if (!news) {
        throw new NotFoundException(
          `News with ID ${createReportInput.newsId} not found`,
        );
      }
    }

    // Check if the report already exists
    let report = await this.reportRepository.findOne({
      where: { newsId: createReportInput.newsId },
      relations: ['news'],
    });

    if (report) {
      // Increment the timesReported field
      report.timesReported += 1;
      return await this.reportRepository.save(report);
    } else {
      report = this.reportRepository.create(createReportInput);
      return await this.reportRepository.save(report);
    }
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find({
      relations: ['news'],
    });
  }
}
