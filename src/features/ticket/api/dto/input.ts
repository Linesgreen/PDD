import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AnswerCreateModel {
  @IsString()
  @IsNotEmpty()
  answer: string;
  @IsBoolean()
  isCorrect: boolean;
}

export class TicketCreateModel {
  @IsNotEmpty()
  img: string | null;
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsString()
  @IsNotEmpty()
  help: string;
  answers: AnswerCreateModel[];
}
