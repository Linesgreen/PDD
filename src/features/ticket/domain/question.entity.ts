import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AnswerEntity } from './answer.entity';
import { TicketEntity } from './ticket.entity';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  help: string;

  @Column()
  ticketId: number;

  @OneToMany(() => AnswerEntity, (answer) => answer.issue)
  answers: AnswerEntity[];

  @ManyToOne(() => TicketEntity, (ticket) => ticket.questions)
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketEntity;
}
