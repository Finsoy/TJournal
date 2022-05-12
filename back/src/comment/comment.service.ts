import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../post/entities/post.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  create(dto: CreateCommentDto) {
    return this.repository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: dto.userId },
    });
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    await this.findAndThrowError(id);

    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateCommentDto) {
    await this.findAndThrowError(id);

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findAndThrowError(id);

    return this.repository.delete(id);
  }

  async findAndThrowError(id: number): Promise<void> {
    const findComment = await this.repository.findOne({ where: { id } });

    if (!findComment) {
      throw new NotFoundException('Комментарий не найден');
    }
  }
}
