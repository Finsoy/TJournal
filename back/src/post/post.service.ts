import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { SearchPostDto } from './dto/search-post.dto';

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
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPopularPosts() {
    const queryBuilder = this.repository.createQueryBuilder('post');

    queryBuilder.orderBy('views', 'DESC');
    queryBuilder.limit(10);

    const [posts, count] = await queryBuilder.getManyAndCount();

    return { posts, count };
  }

  async search(dto: SearchPostDto) {
    const queryBuilder = this.repository.createQueryBuilder('post');

    queryBuilder.limit(dto.limit || 0);
    queryBuilder.take(dto.take || 10);

    dto.views && queryBuilder.orderBy('views', dto.views);

    dto.body && queryBuilder.andWhere(`post.body ILIKE :body`);

    dto.title && queryBuilder.andWhere(`post.title ILIKE :title`);

    dto.tag && queryBuilder.andWhere(`post.tag ILIKE :tag`);

    queryBuilder.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || 'DESC',
    });

    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, total };
  }

  async findOne(id: number) {
    await this.findAndThrowError(id);

    const post = await this.repository.findOne({ where: { id } });
    post.views++;
    return this.repository.save(post);
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
