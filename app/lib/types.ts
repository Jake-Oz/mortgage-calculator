import { z } from "zod";

export const mortgageSchema = z.object({
  amount: z
    .string()
    .transform((val) => Number(val.split(",").join("")))
    .pipe(z.number().min(1, "This field is required")),
  term: z
    .number({ message: "This field is required" })
    .gt(0, "Enter a positive number")
    .int("Enter a whole number"),
  interest: z
    .number({ message: "This field is required" })
    .gt(0, "Enter a positive number"),
  type: z.enum(["Repayment", "Interest Only"], {
    message: "This field is required",
  }),
});

export type TMortgageSchema = z.infer<typeof mortgageSchema>;
