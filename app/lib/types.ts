import { z } from "zod";

export const mortgageSchema = z.object({
  amount: z
    .number({ message: "This field is required" })
    .gt(0, "Enter a positive number"),
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
