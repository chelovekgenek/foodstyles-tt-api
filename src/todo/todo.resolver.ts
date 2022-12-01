import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards';
import { CreateTodoInput, TodoSchema } from './dtos';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CurrentUser } from 'src/user/current-user.decorator';
import { UserEntity } from 'src/user';

@Resolver(() => TodoSchema)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoSchema], { name: 'todos', nullable: false })
  @UseGuards(GqlAuthGuard)
  async getTodos(@CurrentUser() user: UserEntity): Promise<TodoSchema[]> {
    const todos = await this.todoService.getAllByUserId(user.id);
    return todos.map((todo) => this.toDto(todo));
  }

  @Mutation(() => TodoSchema)
  @UseGuards(GqlAuthGuard)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @CurrentUser() user: UserEntity,
  ): Promise<TodoSchema> {
    const todo = await this.todoService.create(input, user);
    return this.toDto(todo);
  }

  private toDto(data: TodoEntity): TodoSchema {
    return plainToClass(TodoSchema, data);
  }
}
