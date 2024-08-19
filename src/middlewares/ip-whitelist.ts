import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { NextFunction, Request, Response } from "express";

export const ipWhitelist = (whitelist: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const clientIp = req.ip as string; // This is fine for most setups, adjust if needed

    if (!whitelist.includes(clientIp)) {
      return next(
        new HttpException(
          "Access denied. Your IP is not whitelisted.",
          StatusCode.Forbidden
        )
      );
    }

    next();
  };
};
