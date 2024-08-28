import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @IsStrongPassword()
  password!: string;

  public constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
