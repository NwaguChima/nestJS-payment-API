import { Injectable } from '@nestjs/common';
import User from 'src/db/models/user';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  async editUser(userId: number, dto: EditUserDto) {
    const user = await User.query().patchAndFetchById(userId, dto);

    return user;
  }

  async deleteUser(userId: number) {
    await User.query().deleteById(userId);

    return { msg: 'User deleted' };
  }
}
