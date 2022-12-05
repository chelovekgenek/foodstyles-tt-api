import { TodoEntity } from './todo.entity';

export type TodosQuery = Partial<Pick<TodoEntity, 'completed'>>;
