import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AnswerEntity } from './answer.entity';
import { TicketEntity } from './ticket.entity';

@Entity('question')
@Index('idx_position_ticketId', ['position', 'ticketId'], { unique: true })
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column()
  position: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  help: string;

  @Column()
  ticketId: number;

  @OneToMany(() => AnswerEntity, (answer) => answer.question, { cascade: true })
  answers: AnswerEntity[];

  @ManyToOne(() => TicketEntity, (ticket) => ticket.questions)
  @JoinColumn({ name: 'ticketId' })
  ticket: TicketEntity;
}
