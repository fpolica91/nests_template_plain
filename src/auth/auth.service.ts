import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  public async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      username: user.email,
      sub: user.userId,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    return null;
  }
}
