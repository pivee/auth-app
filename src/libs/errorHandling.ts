import { ZodError } from "zod";

export const formatZodErrors = (error: ZodError) => {
  const formattedErrors: { [key: string]: string } = {};
  error.errors.forEach((err) => {
    if (err.path) {
      formattedErrors[err.path.join(".")] = err.message;
    }
  });
  return formattedErrors;
};
