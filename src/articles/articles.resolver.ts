import { Article } from './entities/article.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleInput } from './dto/create-article.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateArticleInput } from './dto/update-article.input';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Mutation(() => Article)
  async createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return await this.articlesService.create(createArticleInput);
  }

  @Query(() => [Article], { name: 'articles' })
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articlesService.update(id, updateArticleInput);
  }

  @Query(() => Article, { name: 'article' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.articlesService.findOne(id);
  }
}
