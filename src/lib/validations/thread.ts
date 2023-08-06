import * as z from "zod";

const ThreadValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "minimum 3 characters required" }),
    accountId: z.string()
});

export { ThreadValidation };
