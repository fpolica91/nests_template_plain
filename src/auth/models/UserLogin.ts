import { IsAlphanumeric, IsEmail } from 'class-validator';

export class UserLogin {
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  password: string;
}
