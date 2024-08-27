import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { privateKey, publicKey } from "@AUTH/server";
import { logger } from "./logger";
import { User } from "@AUTH/database/entities/user.entity";
import bcrypt from "bcrypt";
import { TokenPayload } from "@AUTH/@types/auth.type";

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

  public issueToken(user: User, roles: string[]): string {
    const payload: TokenPayload = {
      sub: user.id,
      name: user.firstName + " " + user.lastName,
      roles: roles,
      aud: "authentication",
      scope: "read:messages",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      jti: this.generateJti(),
      email: user.email,
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
      logger.error(`An error occurred while verify token. Error: ${error}`);
      throw error;
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

  public async hashPassword(
    password: string,
    saltRounds: number = 10
  ): Promise<string> {
    try {
      const hashedPassword = bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error: unknown) {
      throw error;
    }
  }

  public TokenLogAction(message: string) {
    try {
      console.log(`${new Date().toISOString()} - ${message}`);
    } catch (error) {
      console.error(`Failed to log token action: ${(error as Error).message}`);
    }
  }
}
