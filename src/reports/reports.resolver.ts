import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Mutation(() => Report)
  async createReport(
    @Args('createReportInput') createReportInput: CreateReportInput,
  ) {
    return await this.reportsService.create(createReportInput);
  }

  @Query(() => [Report], { name: 'reports' })
  async findAll() {
    return await this.reportsService.findAll();
  }
}
