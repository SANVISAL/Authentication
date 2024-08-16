import { Gender } from "@CRUD_PG/utils/consts/enum-column";
import { z } from "zod";

const userSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name is Too Short!" })
    .max(50, { message: " Name is Too long!" }),
  lastName: z
    .string()
    .min(3, { message: " Name is Too Short!" })
    .max(50, { message: "Name is Too long!" }),
  email: z.string().email(),
  gender: z.nativeEnum(Gender),
  address: z.string().optional(),
});

const userUpdateSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name is Too Short!" })
    .max(50, { message: " Name is Too long!" })
    .optional(),
  lastName: z
    .string()
    .min(3, { message: " Name is Too Short!" })
    .max(50, { message: "Name is Too long!" })
    .optional(),
  email: z.string().email().optional(),
  gender: z.nativeEnum(Gender).optional(),
  address: z.string().optional(),
});

export { userSchema, userUpdateSchema };
