import { z } from "zod";

const UserSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name is Too Short!" })
    .max(50, { message: " Name is Too long!" }),
  lastName: z
    .string()
    .min(3, { message: " Name is Too Short!" })
    .max(50, { message: "Name is Too long!" }),
});

export { UserSchema };
