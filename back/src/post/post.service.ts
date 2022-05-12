import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    await this.findAndThrowError(id);

    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.findAndThrowError(id);

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findAndThrowError(id);

    return this.repository.delete(id);
  }

  async findAndThrowError(id: number): Promise<void> {
    const findPost = await this.repository.findOne({ where: { id } });

    if (!findPost) {
      throw new NotFoundException('Статья не найдена');
    }
  }
}
