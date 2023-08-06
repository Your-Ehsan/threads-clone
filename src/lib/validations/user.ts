import * as z from "zod";

const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3).max(30),
  bio: z.string().min(6).max(1000),
  username: z.string().min(3).max(30),
});

export { UserValidation };
