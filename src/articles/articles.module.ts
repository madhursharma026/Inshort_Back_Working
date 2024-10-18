import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
