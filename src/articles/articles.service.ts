import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    return await this.articleRepository.save(createArticleInput);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async update(
    id: number,
    updateArticleInput: Partial<CreateArticleInput>,
  ): Promise<Article> {
    const articles = await this.articleRepository.preload({
      id,
      ...updateArticleInput,
    });

    if (!articles) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return this.articleRepository.save(articles);
  }
}
