import { ValidationError } from "class-validator";

export function formatValidationErrors(errors: ValidationError[]): string[] {
  const formattedErrors: string[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      Object.values(error.constraints).forEach((message) => {
        formattedErrors.push(message);
      });
    }

    // If there are nested errors, recursively format them
    if (error.children!.length > 0) {
      formattedErrors.push(...formatValidationErrors(error.children!));
    }
  });

  return formattedErrors;
}
