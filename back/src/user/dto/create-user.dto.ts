import { IsEmail, Length } from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation';

export class CreateUserDto {
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, { message: 'Такая почта уже есть' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов' })
  password?: string;
}
