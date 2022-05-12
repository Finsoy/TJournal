import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов' })
  password?: string;
}
