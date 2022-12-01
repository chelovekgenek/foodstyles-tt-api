import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dtos';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repository: Repository<TodoEntity>,
  ) {}

  async getAllByUserId(userId: number): Promise<TodoEntity[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }

  async create(data: CreateTodoInput, user: UserEntity): Promise<TodoEntity> {
    const entity = this.repository.create({ ...data, user });

    return this.repository.save(entity);
  }
}
