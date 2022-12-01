import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards';
import {
  CreateTodoInput,
  TodoIdArg,
  TodoSchema,
  TodosFilterInput,
} from './dtos';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CurrentUser } from 'src/user/current-user.decorator';
import { UserEntity } from 'src/user';

@Resolver(() => TodoSchema)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoSchema], { name: 'todos', nullable: false })
  @UseGuards(GqlAuthGuard)
  async getTodos(
    @Args('filter', { nullable: true })
    filter: TodosFilterInput,
    @CurrentUser() { id: userId }: UserEntity,
  ): Promise<TodoSchema[]> {
    const query = this.todoService.buildQueryFromFilter(filter);
    const todos = await this.todoService.getAllByUserId(userId, query);
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

  @Mutation(() => TodoSchema)
  @UseGuards(GqlAuthGuard)
  async markTodoCompleted(
    @Args(TodoIdArg) todoId: number,
  ): Promise<Pick<TodoSchema, 'id'>> {
    const todo = await this.todoService.updateById(todoId, {
      completed: true,
    });
    return this.toDto(todo);
  }

  @Mutation(() => TodoSchema)
  @UseGuards(GqlAuthGuard)
  async markTodoIncompleted(
    @Args(TodoIdArg) todoId: number,
  ): Promise<Pick<TodoSchema, 'id'>> {
    const todo = await this.todoService.updateById(todoId, {
      completed: false,
    });
    return this.toDto(todo);
  }

  @Mutation(() => TodoSchema)
  @UseGuards(GqlAuthGuard)
  async deleteTodo(
    @Args(TodoIdArg) todoId: number,
  ): Promise<Pick<TodoSchema, 'id'>> {
    await this.todoService.deleteById(todoId);
    return { id: todoId };
  }

  private toDto(data: TodoEntity): TodoSchema {
    return plainToClass(TodoSchema, data);
  }
}
