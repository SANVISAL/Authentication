import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { ApiError } from "@AUTH/utils/api-error";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { TokenService } from "@AUTH/utils/jwt";
import { DecodeUser } from "@AUTH/@types/auth.type";

export interface RequestWithUser extends Request {
  user: DecodeUser;
}

const tokenService = new TokenService();
export const authorize = (requireRole: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;
      console.log("Token:", token);
      const decoded = await tokenService.verifyToken(token);
      console.log("decode:", decoded);

      const { roles } = decoded;
      // const roles = ["teacher", "user"];

      logger.info(
        `User Role ${
          Array.isArray(roles) ? roles.join(", ") : roles
        } and requireRole ${requireRole} and is match ${
          Array.isArray(roles)
            ? roles.some((r) => requireRole.includes(r))
            : requireRole.includes(roles)
        }`
      );

      let hasRequiredRole: boolean;
      if (Array.isArray(roles)) {
        hasRequiredRole = roles.some((r) => requireRole.includes(r));
      } else {
        hasRequiredRole = requireRole.includes(roles);
      }

      if (!hasRequiredRole) {
        throw new HttpException(
          "Forbidden - Insufficient permissions",
          StatusCode.Forbidden
        );
      }

      // (req as RequestWithUser).user = decoded;
      (req as RequestWithUser).user = {
        ...decoded,
        userid: decoded.sub, // Assuming 'sub' is the property that holds the user ID
        role: decoded.roles, // Assuming 'roles' is the property that holds the user roles
      };
      // req.Id = sub; // Attach userId to the request object
      logger.info(
        `User with roles '${
          Array.isArray(roles) ? roles.join(", ") : roles
        }' authorized for '${requireRole}' roles`
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
