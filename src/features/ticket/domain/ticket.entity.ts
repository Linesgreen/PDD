import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Entity('tickets')
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index(['number', 'id'], { unique: true })
  @Column()
  number: number;

  @OneToMany(() => QuestionEntity, (q) => q.ticket, { cascade: true })
  questions: QuestionEntity[];
}
