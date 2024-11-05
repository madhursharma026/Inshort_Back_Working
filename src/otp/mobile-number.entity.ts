import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class MobileNumber {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  phoneNumber: string;

  @Field()
  @Column({ nullable: true })
  sessionId: string;

  @Field()
  @Column({ nullable: true })
  createdAt: Date;

  @Field()
  @Column({ default: 'not confirmed' })
  status: string;

  @Field()
  @Column({ nullable: true })
  lastLogin: Date;

  @Field()
  @Column({ nullable: true, default: '' })
  name: string;

  // New field for profile photo with default URL
  @Field()
  @Column({
    nullable: true,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  })
  profilePhoto: string;
}
