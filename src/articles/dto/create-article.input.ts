import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  imageURL: string;

  @Field({ nullable: true, defaultValue: 'active' })
  status?: string;
}
