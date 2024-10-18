import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Article {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 500 }) // Set title with a maximum of 500 characters
  title: string;

  @Field()
  @Column({ type: 'longtext' }) // Set description as LONGTEXT
  description: string;

  @Field()
  @Column()
  imageURL: string;

  @Field(() => String, { defaultValue: 'active' })
  @Column({ default: 'active' })
  status: string;

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
