import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/models/User';

export interface AuthRequest extends Request {
  principal: User;
}
