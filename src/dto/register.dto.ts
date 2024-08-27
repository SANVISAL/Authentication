import { Gender } from "@AUTH/utils/consts";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @IsStrongPassword()
  password!: string;

  @IsEnum(Gender)
  gender: Gender = Gender.unknown;

  @IsString({ each: true })
  roles!: string[];

  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: Gender,
    roles: string[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    (this.gender = gender), (this.roles = roles);
  }
}
