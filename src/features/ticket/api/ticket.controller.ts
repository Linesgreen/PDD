import { Body, Controller, Post } from '@nestjs/common';

@Controller('/ticket')
export class TicketController {
  constructor() {}

  @Post('/')
  async addTicket(@Body() body) {}
}
