import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { privateKey } from "@AUTH/server";
import { logger } from "./logger";
import { User } from "@AUTH/database/entities/user.entity";
import bcrypt from "bcrypt";
import { TokenPayload } from "@AUTH/@types/auth.type";
import path from "path";
import fs from "fs";
export class TokenService {
  private privateKey: Secret;
  // private publicKey: Secret;

  constructor() {
    this.privateKey = privateKey;
    // this.publicKey = publicKey;
    console.log("publicKey: ", this.privateKey);
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
    console.log("privatekey:", this.privateKey);
    return jwt.sign(payload, this.privateKey, { algorithm: "RS256" });
  }

  public async verifyToken(token: string): Promise<TokenPayload> {
    try {
      // console.log("publicKey:", this.publicKey);
      const publicKey = fs.readFileSync(
        path.join(__dirname, "../../publicKey.pem"),
        "utf8"
      );
      console.log("publicKey:", publicKey);
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      }) as TokenPayload;
      console.log("decode:", decoded);
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

  // public decodeToken() {
  //   try {
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public TokenLogAction(message: string) {
    try {
      console.log(`${new Date().toISOString()} - ${message}`);
    } catch (error) {
      console.error(`Failed to log token action: ${(error as Error).message}`);
    }
  }
}
