import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpData {
  @Field()
  phoneNumber: string;

  @Field()
  sessionId: string;
}

@ObjectType()
export class OtpResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => OtpData, { nullable: true })
  data?: OtpData;
}
