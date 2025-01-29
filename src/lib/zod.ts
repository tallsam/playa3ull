import { z } from "zod";

export function formatZodError(error: z.ZodError) {
  return error.errors
    .map((err) => {
      const field = err.path.join(".");
      return `${field}: ${err.message}`;
    })
    .join(", ");
}
