import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnswerEntity } from '../domain/answer.entity';
import { QuestionEntity } from '../domain/question.entity';
import { TicketEntity } from '../domain/ticket.entity';
import { TicketCreateModel } from './dto/input';

@Controller('/ticket')
export class TicketController {
  constructor(
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  @Post('/')
  async addTicket(@Body() ticketData: TicketCreateModel): Promise<void> {
    const questionData = ticketData;

    const ticketNumber = questionData.ticket_number;

    // Получаем билет из базы данных или создаем новый
    let ticket = await this.ticketRepository.findOne({
      where: { number: ticketNumber },
      relations: ['questions'], // Убедитесь, что загружаете вопросы, если это необходимо
    });

    if (!ticket) {
      ticket = new TicketEntity();
      ticket.number = ticketNumber;
    }

    // Создаем новый вопрос
    const question = new QuestionEntity();
    question.img = questionData.img;
    question.position = questionData.position;
    question.question = questionData.question;
    question.help = questionData.help;
    question.answers = questionData.answers.map((a) => {
      const answer = new AnswerEntity();
      answer.answer = a.answer_text;
      answer.isCorrect = a.is_correct;
      return answer;
    });

    // Если уже есть вопросы, добавляем к ним, иначе создаем новый список
    if (ticket.questions) {
      ticket.questions.push(question);
    } else {
      ticket.questions = [question];
    }

    // Сохраняем или обновляем билет в базе данных
    await this.ticketRepository.save(ticket);
  }
}
