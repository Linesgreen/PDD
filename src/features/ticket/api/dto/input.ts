import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class AnswerCreateModel {
  @IsString()
  @IsNotEmpty()
  answer_text: string;
  @IsBoolean()
  is_correct: boolean;
}

export class TicketCreateModel {
  @IsNumber()
  ticket_number: number;
  @IsNumber()
  position: number;
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsString()
  @IsNotEmpty()
  help: string;
  @ValidateNested({ each: true })
  @Type(() => AnswerCreateModel)
  answers: AnswerCreateModel[];
  img: string | null;
}
