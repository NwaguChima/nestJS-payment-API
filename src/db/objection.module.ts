import { Global, Module } from '@nestjs/common';
import Payment from './models/payment';
import User from './models/user';

@Global()
@Module({
  providers: [User, Payment],
  exports: [User, Payment],
})
export class ObjectionModule {}
