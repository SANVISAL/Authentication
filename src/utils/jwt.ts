import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { privateKey, publicKey } from "@AUTH/server";
import { HttpException } from "./http-exception";
import { StatusCode } from "./consts";
import { logger } from "./logger";
import { User } from "@AUTH/database/entities/user.entity";
// import { ICreateUser, IUser } from "@AUTH/@types/user.type";
// import { IJwt } from "@CRUD_PG/@types/auth.type";
// import { string } from "joi";

interface TokenPayload extends JwtPayload {
  sub: string;
  name: string;
  aud: string;
  scope: string;
  // role: string;
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

  public  issueToken(user: User): string {
    // const role =  this.roleRepository.findByName(user.role);
    const payload: TokenPayload = {
      sub: user.id,
      name: user.firstName + " " + user.lastName,
      // role: roleName,
      aud: "authentication",
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
  public getTokenExpiration(token: string): Date {
    const decoded = jwt.decode(token) as JwtPayload;
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000); // Convert to milliseconds
    }
    return new Date(); // Default fallback
  }

  public rotateRefreshToken(user: User): string {
    const jit = this.generateJti();
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
