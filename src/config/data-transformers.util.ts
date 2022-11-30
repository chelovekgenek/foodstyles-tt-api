import { Transform } from 'class-transformer';

export const ToNumber = Transform(({ value: v }) =>
  typeof v === 'string' ? Number(v) : v,
);

export const ToBoolean = Transform(({ value: v }) => v === 'true');
