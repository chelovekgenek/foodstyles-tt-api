import { Int } from '@nestjs/graphql';

export const TodoIdArg = { name: 'todoId', type: () => Int };
