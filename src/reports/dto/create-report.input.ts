import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReportInput {
  @Field()
  details: string;

  @Field(() => Int, { nullable: true })
  newsId?: number; // Allow newsId to be optional
}
