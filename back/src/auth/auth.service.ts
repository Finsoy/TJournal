import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  generateJwtToken(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({ email, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    return {
      ...userData,
      access_token: this.generateJwtToken(userData),
    };
  }

  async register({ email, password, fullName }: CreateUserDto) {
    const user = await this.usersService.findByCond({ email });
    if (user) {
      throw new HttpException(
        {
          message: 'User with this email already exists!',
        },
        409,
      );
    }
    try {
      const { password: userPassword, ...userData } =
        await this.usersService.create({
          email,
          password,
          fullName,
        });
      return {
        ...userData,
        access_token: this.generateJwtToken(userData),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          error: 'Ошибка регистрации',
        },
        error.status,
      );
    }
  }
}
