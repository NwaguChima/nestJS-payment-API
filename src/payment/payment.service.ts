import { ForbiddenException, Injectable } from '@nestjs/common';
import Payment from 'src/db/models/payment';
import { CreatePaymentDto, EditPaymentDto } from './dto';

@Injectable()
export class PaymentService {
  async getPayments(userId: number) {
    try {
      const payments = await Payment.query().where('user_id', '=', userId);

      return payments;
    } catch (error) {
      return error;
    }
  }

  async getPaymentById(userId: number, paymentId: number) {
    try {
      const payment = await Payment.query()
        .where('user_id', '=', userId)
        .where('id', '=', paymentId);

      if (!payment || payment.length == 0) {
        throw new ForbiddenException('No payment record found');
      }

      return payment;
    } catch (error) {
      return error;
    }
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
      return { error };
    }
  }

  async editPaymentById(
    userId: number,
    paymentId: number,
    dto: EditPaymentDto,
  ) {
    try {
      const paymentsData = await Payment.query().where('id', '=', paymentId);

      const payments = paymentsData[0].toJSON() as { user_id: number };

      if (!payments || payments.user_id !== userId) {
        throw new ForbiddenException('Access to resource denied!');
      }

      const payment = await Payment.query().patchAndFetchById(paymentId, dto);

      return payment;
    } catch (error) {
      return error;
    }
  }

  async deletePaymentById(userId: number, paymentId: number) {
    try {
      const paymentsData = await Payment.query().where('id', '=', paymentId);

      const payments = paymentsData[0].toJSON() as { user_id: number };

      if (!payments || payments.user_id !== userId) {
        throw new ForbiddenException('Access to resource denied!');
      }

      await Payment.query().deleteById(paymentId);
    } catch (error) {
      return error;
    }
  }
}
