import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export enum TodoCompletenessFilter {
  ALL = 'all',
  COMPLETE = 'completed',
  INCOMPLETE = 'incompleted',
}

registerEnumType(TodoCompletenessFilter, {
  name: 'TodoCompletenessFilter',
});

@InputType()
export class TodosFilterInput {
  @Expose()
  @Field(() => TodoCompletenessFilter)
  @IsEnum(TodoCompletenessFilter)
  @IsOptional()
  completeness?: TodoCompletenessFilter;
}
