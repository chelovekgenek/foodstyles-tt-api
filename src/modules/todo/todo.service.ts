import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user';
import {
  CreateTodoInput,
  TodoCompletenessFilter,
  TodosFilterInput,
} from './dtos';
import { TodoEntity } from './todo.entity';
import { TodosQuery } from './todo.types';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repository: Repository<TodoEntity>,
  ) {}

  async getAllByUserId(
    userId: number,
    query: TodosQuery = {},
  ): Promise<TodoEntity[]> {
    return this.repository.find({
      where: { ...query, user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: CreateTodoInput, user: UserEntity): Promise<TodoEntity> {
    const entity = this.repository.create({ ...data, user });

    return this.repository.save(entity);
  }

  async getByIdOrFail(id: number): Promise<TodoEntity> {
    const todo = await this.repository.findOne({ where: { id } });
    if (todo) {
      return todo;
    }

    throw new NotFoundException();
  }

  async updateById(
    id: number,
    data: Pick<TodoEntity, 'completed'>,
  ): Promise<TodoEntity> {
    const todo = await this.getByIdOrFail(id);
    const merged = this.repository.merge(todo, data);
    return this.repository.save(merged);
  }

  async deleteById(id: number): Promise<void> {
    const todo = await this.getByIdOrFail(id);
    await this.repository.delete(todo.id);
  }

  buildQueryFromFilter(filter: TodosFilterInput = {}): TodosQuery {
    const query: TodosQuery = {};
    if (filter?.completeness === TodoCompletenessFilter.COMPLETE) {
      query.completed = true;
    }
    if (filter?.completeness === TodoCompletenessFilter.INCOMPLETE) {
      query.completed = false;
    }

    return query;
  }
}
