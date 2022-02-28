import { Injectable } from '@nestjs/common';
import Payment from 'src/db/models/payment';
import User from 'src/db/models/user';
import { CreatePaymentDto, EditPaymentDto } from './dto';

@Injectable()
export class PaymentService {
  async getPayments(userId: number) {
    const payments = await Payment.query().where('user_id', '=', userId);

    return payments;
  }

  async getPaymentById(userId: number, paymentId: number) {
    const payments = await Payment.query()
      .where('user_id', '=', userId)
      .where('id', '=', paymentId);

    return payments;
  }

  async createPayment(userId: number, dto: CreatePaymentDto) {
    try {
      const data = {
        ...dto,
        user_id: userId,
      };
      const payment = await Payment.query().insert(data);

      return payment;
    } catch (error) {
      return { statusCode: 400, error };
    }
  }

  editPaymentById(userId: number, paymentId: number, dto: EditPaymentDto) {}

  deletePaymentById(userId: number, paymentId: number) {}
}
