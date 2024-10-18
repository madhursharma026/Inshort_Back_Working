import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  sourceURLFormate?: string;

  @Field({ nullable: true })
  sourceURL?: string;

  @Field({ nullable: true })
  readMoreContent?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true, defaultValue: 'active' })
  status?: string;

  @Field({ nullable: true, defaultValue: 'normal' }) // Default priority is 'normal'
  priority?: 'high' | 'normal' | 'low';
}
