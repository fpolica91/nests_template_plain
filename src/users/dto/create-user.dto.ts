export class CreateUserDto {
  email: string;
  password: string;
}

export interface CreateUser {
  email: string;
  password: string;
}

export interface UserDto {
  email: string;
  password: string;
  userId: string;
}
