import { ValidationError } from 'class-validator';
import { TransformValidationOptions } from 'class-transformer-validator';

export interface FlatValidationError {
  /**
   * Object's property path that haven't pass validation.
   */
  path: string;

  /**
   * First constraint that failed validation with error message.
   */
  message: string;
}

export type ExtendedTransformValidationOptions = TransformValidationOptions;

export const flattenValidationErrors = (
  errors: ValidationError[],
): FlatValidationError[] => {
  const flatErrors: FlatValidationError[] = [];

  function toFlatArray(error: ValidationError, parentPath = ''): void {
    // we format numbers as array indexes for better readability.
    const formattedProperty = Number.isInteger(+error.property)
      ? `[${error.property}]`
      : `${parentPath ? '.' : ''}${error.property}`;

    if (error.constraints) {
      const constraint = Object.values(error.constraints).pop();
      flatErrors.push({
        path: `${parentPath}${formattedProperty}`,
        message: constraint,
      });
    } else if (error.children.length > 0) {
      for (const child of error.children) {
        toFlatArray(child, `${parentPath}${formattedProperty}`);
      }
    }
  }

  for (const error of errors) {
    toFlatArray(error, '');
  }

  return flatErrors;
};
