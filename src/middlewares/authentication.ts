import { DecodeUser } from "@AUTH/@types/auth.type";
import { ApiError } from "@AUTH/utils/api-error";
import { StatusCode } from "@AUTH/utils/consts";
import { RoleScopes } from "@AUTH/utils/consts/enum-column";
import { HttpException } from "@AUTH/utils/http-exception";
import { TokenService } from "@AUTH/utils/jwt";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: DecodeUser;
}

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  requiredScopes?: string[]
): Promise<any> => {
  if (securityName !== "jwt") {
    throw new ApiError("Security name not supported.", StatusCode.BadRequest);
  }

  const token =
    (request.headers["x-access-token"] as string) ||
    (request.headers.authorization?.split(" ")[1] as string);

  if (!token) {
    throw new HttpException("No valid token provided", StatusCode.Unauthorized);
  }

  const tokenService = new TokenService();
  let decoded;

  try {
    decoded = await tokenService.verifyToken(token);
  } catch (error) {
    throw new HttpException("Invalid token", StatusCode.Unauthorized);
  }

  const { roles } = decoded;

  if (!roles || !Array.isArray(roles)) {
    throw new HttpException("Invalid token roles", StatusCode.Forbidden);
  }

  const userScopes = roles.flatMap((role) => RoleScopes[role] || []);
  const uniqueScopes = Array.from(new Set(userScopes));
  if (requiredScopes) {
    const hasRequiredScopes = requiredScopes.every((scope) =>
      uniqueScopes.includes(scope)
    );
    if (!hasRequiredScopes) {
      throw new HttpException(
        "Forbidden: Insufficient scopes",
        StatusCode.Forbidden
      );
    }
    return {
      userId: decoded.sub,
      roles,
      scopes: uniqueScopes,
    };
  }
};
