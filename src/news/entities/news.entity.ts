import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Report } from 'src/reports/entities/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class News {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  readMoreContent: string;

  @Field()
  @Column()
  sourceURLFormate: string;

  @Field()
  @Column()
  sourceURL: string;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  author: string;

  @Field(() => String, { defaultValue: 'active' })
  @Column({ default: 'active' })
  status: string;

  @Field(() => String, { defaultValue: 'en' })
  @Column({ default: 'en' })
  language: string;

  @Field(() => String, { defaultValue: 'normal' }) // New priority field with default 'normal'
  @Column({ default: 'normal' })
  priority: 'high' | 'normal' | 'low';

  @Field(() => [Report], { nullable: true })
  @OneToMany(() => Report, (report) => report.news)
  reports?: Report[];

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;
}
