import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreatePaymentDto, EditPaymentDto } from './dto';
import { PaymentService } from './payment.service';

@UseGuards(JwtGuard)
@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  getPayments(@GetUser('id') userId: number) {
    return this.paymentService.getPayments(userId);
  }

  @Get(':id')
  getPaymentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
  ) {
    return this.paymentService.getPaymentById(userId, paymentId);
  }

  @Post()
  createPayments(@GetUser('id') userId: number, @Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayments(userId, dto);
  }

  @Patch(':id')
  editPaymentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
    @Body() dto: EditPaymentDto,
  ) {
    return this.paymentService.editPaymentById(userId, paymentId, dto);
  }

  @Delete(':id')
  deletePaymentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
  ) {
    return this.paymentService.deletePaymentById(userId, paymentId);
  }
}
