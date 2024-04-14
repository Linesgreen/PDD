import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Entity('answers')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @Column()
  issueId: number;

  @ManyToOne(() => QuestionEntity, (issue) => issue.answers)
  @JoinColumn({ name: 'issueId' })
  issue: QuestionEntity;
}
