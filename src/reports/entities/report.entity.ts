import { News } from 'src/news/entities/news.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Report {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  details: string;

  @Field(() => Int)
  @Column()
  newsId: number;

  @Field(() => Int)
  @Column({ default: 1 })
  timesReported: number;

  @Field(() => News, { nullable: true })
  @ManyToOne(() => News, (news) => news.reports, { nullable: true })
  news?: News;
}
