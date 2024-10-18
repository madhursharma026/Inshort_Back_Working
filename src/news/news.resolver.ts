import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  // Query to get all news
  @Query(() => [News], { name: 'allNews' })
  findAll() {
    return this.newsService.findAll();
  }

  // Query to get news by language
  @Query(() => [News], { name: 'newsByLanguage' })
  findByLanguage(@Args('language') language: string) {
    return this.newsService.findByLanguage(language);
  }

  // Query to get a specific news article by ID
  @Query(() => News, { name: 'newsById' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findById(id);
  }

  // Mutation to create a new news article
  @Mutation(() => News)
  createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
    return this.newsService.create(createNewsInput);
  }

  // Mutation to update an existing news article
  @Mutation(() => News)
  updateNews(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateNewsInput') updateNewsInput: UpdateNewsInput,
  ) {
    return this.newsService.update(id, updateNewsInput);
  }

  // Mutation to downgrade a news article to low priority
  @Mutation(() => Boolean)
  async downgradeNewsToLowPriority(
    @Args('id', { type: () => Int }) id: number,
  ) {
    await this.newsService.downgradeToLowPriority(id);
    return true; // Return true if successful
  }
}
