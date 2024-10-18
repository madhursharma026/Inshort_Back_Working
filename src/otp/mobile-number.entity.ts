import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MobileNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ default: 'not confirmed' })
  status: string;

  @Column({ nullable: true }) // New column for last login
  lastLogin: Date;
}
