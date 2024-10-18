import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { News } from 'src/news/entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, News])],
  providers: [ReportsResolver, ReportsService],
})
export class ReportsModule {}
