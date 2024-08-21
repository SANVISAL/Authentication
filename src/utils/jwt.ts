import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "@CRUD_PG/services/mock-service.ts/mock-user";

import { privateKey } from "@CRUD_PG/server";
interface tokenPayload {
  sub: string;
  name: string;
  aud: string;
  scope: string;
  //   role: string;
  iat?: number;
  exp?: number; // JWT expiration time in seconds from now
  jti: string;
}

export class TokenService {
  private privateKey: Secret;
  constructor() {
    this.privateKey = privateKey;
  }

  // Method to generate a unique JWT ID (jti)
  private generateJti(): string {
    return Math.random().toString(36).substring(7) + Date.now();
  }
  
  public issueToken(user: IUser): string {
    const payload: tokenPayload = {
      sub: user.id,
      name: user.firstName + " " + user.lastName,
      aud: "your-service",
      scope: "read:messages",
      //   role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15 min expiration
      jti: this.generateJti(), // Unique token ID
    };
    return jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
  }
}
