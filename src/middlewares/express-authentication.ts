import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { TokenService } from "@AUTH/utils/jwt";
import { logger } from "@AUTH/utils/logger";
import { Request } from "express";

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  requiredRoles: string[] = [],
  scopes?: string[]
): Promise<any> => {
  try {
    if (securityName !== "oauth2") {
      throw new HttpException(
        "Unsupported security scheme",
        StatusCode.Unauthorized
      );
    }

    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      throw new HttpException("No token provided.", StatusCode.Unauthorized);
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7, authHeader.length)
      : authHeader;

    const tokenService = new TokenService();
    const decoded = await tokenService.verifyToken(token);

    const { roles } = decoded;
    if (!roles) {
      throw new HttpException(
        "No roles found in the token.",
        StatusCode.Forbidden
      );
    }

    const hasRequiredRoles = Array.isArray(roles)
      ? roles.some((role) => requiredRoles.includes(role))
      : requiredRoles.includes(roles);

    if (!hasRequiredRoles) {
      throw new HttpException(
        "Forbidden - Insufficient permissions",
        StatusCode.Forbidden
      );
    }

    logger.info(
      `User with roles '${
        Array.isArray(roles) ? roles.join(", ") : roles
      }' authorized for '${requiredRoles.join(", ")}' roles`
    );

    if (scopes && !scopes.every((scope) => tokenHasScope(decoded, scope))) {
      throw new HttpException("Insufficient scopes", StatusCode.Forbidden);
    }

    return decoded;
  } catch (error: unknown) {
    logger.error(
      `Authorization error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    throw error;
  }
};

// Helper function to check if the token has the required scope
const tokenHasScope = (decodedToken: any, requiredScope: string): boolean => {
  if (!decodedToken.scopes) {
    return false;
  }
  return decodedToken.scopes.includes(requiredScope);
};
