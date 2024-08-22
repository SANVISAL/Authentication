import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { privateKey, publicKey } from "@CRUD_PG/server";
import { IUser } from "@CRUD_PG/services/mock-service.ts/auth-service";
import { HttpException } from "./http-exception";
import { StatusCode } from "./consts";
import { logger } from "./logger";
// import { IJwt } from "@CRUD_PG/@types/auth.type";
// import { string } from "joi";

interface TokenPayload extends JwtPayload {
  sub: string;
  name: string;
  aud: string;
  scope: string;
  iat?: number;
  exp?: number;
  jti: string;
}

export class TokenService {
  private privateKey: Secret;
  private publicKey: Secret;

  constructor() {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  private generateJti(): string {
    return Math.random().toString(36).substring(7) + Date.now();
  }

  public issueToken(user: IUser): string {
    const payload: TokenPayload = {
      sub: user.id,
      name: user.firstName + " " + user.lastName,
      aud: "your-service",
      scope: "read:messages",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      jti: this.generateJti(),
    };
    return jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
  }

  public async verifyToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, this.publicKey, {
        algorithms: ["RS256"],
      }) as TokenPayload;
      return decoded;
    } catch (error) {
      logger.info("error at file jwt:", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException("Invalid token", StatusCode.BadRequest);
    }
  }

  public rotateRefreshToken(user: IUser): string {
    const jit = this.generateJti();
    // const refreshTokenExpiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    // const expireAt = new Date(Date.now() + refreshTokenExpiresIn);
    const newRefreshToken = jwt.sign({ sub: user.id }, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
      jwtid: jit,
    });

    return newRefreshToken;
  }

  public TokenLogAction(message: string) {
    try {
      console.log(`${new Date().toISOString()} - ${message}`);
    } catch (error) {
      console.error(`Failed to log token action: ${(error as Error).message}`);
    }
  }
}
