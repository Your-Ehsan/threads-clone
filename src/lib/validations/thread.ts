import * as z from "zod";

const ThreadValidation = z.object({
    thread: z
      .string()
      .nonempty()
      .min(3, { message: "minimum 3 characters required" }),
    accountId: z.string(),
  }),
  CommentValidation = z.object({
    thread: z
      .string()
      .nonempty()
      .min(3, { message: "minimum 3 charcters required" }),
  });

export { ThreadValidation , CommentValidation };
