import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TokenResponseDTO {
  @IsString()
  @IsNotEmpty({ message: "Access token is required!" })
  accessToken!: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsDate({ message: "Expiration date must be a valid date!" })
  expireAt!: Date;

  public constructor(
    accessToken: string,
    refreshToken: string,
    expireAt: Date
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expireAt = expireAt;
  }
}
