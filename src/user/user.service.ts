import { Injectable } from '@nestjs/common';
import User from 'src/db/models/user';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  async editUser(userId: number, dto: EditUserDto) {
    try {
      const user = await User.query().patchAndFetchById(userId, dto);

      return user;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(userId: number) {
    try {
      await User.query().deleteById(userId);
    } catch (error) {
      return error;
    }
  }
}
