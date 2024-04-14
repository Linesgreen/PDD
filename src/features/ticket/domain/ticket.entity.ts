import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Entity('tickets')
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => QuestionEntity, (q) => q.ticket)
  questions: QuestionEntity[];
}
