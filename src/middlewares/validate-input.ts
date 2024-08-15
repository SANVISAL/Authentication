import { z } from "zod";
import { Response, Request, NextFunction } from "express";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { error } from "console";
import { HttpException } from "@CRUD_PG/utils/http-exception";

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

export const validateInput = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const parsed = await UserSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpException("Please Check Your Name!", StatusCode.BadRequest);
    }
  } catch (errro) {
    if (error instanceof HttpException) {
      throw error;
    }
    next(errro);
  }
};
