import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import setupDb from './db/db-setup';

setupDb();

@Module({
  imports: [AuthModule, UserModule, PaymentModule],
})
export class AppModule {}
