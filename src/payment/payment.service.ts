import { Injectable } from '@nestjs/common';
import { CreatePaymentDto, EditPaymentDto } from './dto';

@Injectable()
export class PaymentService {
  getPayments(userId: number) {}

  getPaymentById(userId: number, paymentId: number) {}

  createPayments(userId: number, dto: CreatePaymentDto) {}

  editPaymentById(userId: number, paymentId: number, dto: EditPaymentDto) {}

  deletePaymentById(userId: number, paymentId: number) {}
}
