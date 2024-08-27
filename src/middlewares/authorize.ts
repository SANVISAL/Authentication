import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { ApiError } from "@AUTH/utils/api-error";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";

export interface RequestWithUser extends Request {
  user: DecodedUser;
}

export const authorize = (requireRole: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;
      const decoded = await decodedToken(token);

      const { role } = decoded;
      // const role = ["teacher", "user"];

      logger.info(
        `User Role ${
          Array.isArray(role) ? role.join(", ") : role
        } and requireRole ${requireRole} and is match ${
          Array.isArray(role)
            ? role.some((r) => requireRole.includes(r))
            : requireRole.includes(role)
        }`
      );

      let hasRequiredRole: boolean;
      if (Array.isArray(role)) {
        hasRequiredRole = role.some((r) => requireRole.includes(r));
      } else {
        hasRequiredRole = requireRole.includes(role);
      }

      if (!hasRequiredRole) {
        throw new HttpException(
          "Forbidden - Insufficient permissions",
          StatusCode.Forbidden
        );
      }

      (req as RequestWithUser).user = decoded;

      logger.info(
        `User with role '${
          Array.isArray(role) ? role.join(", ") : role
        }' authorized for '${requireRole}' role`
      );

      next();
    } catch (error: unknown) {
      logger.error("Authorization error:", error);
      if (error instanceof HttpException) {
        next(error);
      } else {
        next(
          new ApiError("Unauthorized - Invalid token", StatusCode.Unauthorized)
        );
      }
    }
  };
};
