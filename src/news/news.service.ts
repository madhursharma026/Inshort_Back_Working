import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsInput } from './dto/create-news.input';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepo: Repository<News>,
  ) {}

  async create(createNewsInput: CreateNewsInput) {
    const news = this.newsRepo.create(createNewsInput);
    return await this.newsRepo.save(news);
  }

  findAll() {
    return this.newsRepo.find({
      order: {
        priority: 'ASC', // High priority first, then normal, then low
        publishedAt: 'DESC', // Within each priority, sort by latest published
      },
    });
  }

  findByLanguage(language: string) {
    return this.newsRepo.find({
      where: { language },
      order: {
        priority: 'ASC', // Sort by priority
        publishedAt: 'DESC', // Sort by time within priority
      },
    });
  }

  async findById(id: number): Promise<News> {
    const news = await this.newsRepo.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(
    id: number,
    updateNewsInput: Partial<CreateNewsInput>,
  ): Promise<News> {
    const news = await this.newsRepo.preload({
      id,
      ...updateNewsInput,
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return this.newsRepo.save(news);
  }

  async downgradeToLowPriority(id: number): Promise<void> {
    const news = await this.findById(id);
    news.priority = 'low'; // Change priority to 'low'
    await this.newsRepo.save(news);
  }
}
