import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Entity('tickets')
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @OneToMany(() => QuestionEntity, (q) => q.ticket)
  questions: QuestionEntity[];
}
