import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    console.log(dto);
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne({
      where: {
        ...cond,
      },
    });
  }

  update(id: number, dto: UpdateUserDto) {
    try {
      return this.repository.save({ ...dto, id });
    } catch (error) {
      console.log(error);
    }
  }

  async search(dto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder('user');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.fullName) {
      qb.andWhere('user.fullName ILIKE :fullName', {
        fullName: `%${dto.fullName}%`,
      });
    }

    if (dto.email) {
      qb.andWhere('user.email ILIKE :email', {
        email: `%${dto.email}%`,
      });
    }

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }
}
