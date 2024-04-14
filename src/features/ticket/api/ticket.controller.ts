import { Body, Controller, Post } from '@nestjs/common';

import { TicketCreateModel } from './dto/input';

@Controller('/ticket')
export class TicketController {
  constructor() {}

  @Post('/')
  async addTicket(@Body() ticketData: TicketCreateModel): Promise<void> {
    console.log(ticketData);
  }
}
