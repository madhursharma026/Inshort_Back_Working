import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpData {
  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  sessionId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  profilePhoto?: string; // Add profilePhoto field
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
