import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
