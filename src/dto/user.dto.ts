import { Gender } from "@AUTH/utils/consts";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class UserProfileDTO {
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  @Length(3, 50, { message: "First name must be between 3 and 50 characters" })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @Length(3, 50, { message: "Last name must be between 3 and 50 characters" })
  lastName!: string;

  @IsEmail({}, { message: "Email must be a valid email address" })
  email!: string;

  @IsEnum(Gender, { message: "Gender must be a valid enum value" })
  @IsNotEmpty()
  gender: Gender = Gender.unknown;

  public constructor(
    firstName: string,
    lastName: string,
    gender: Gender,
    email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
  }
}

export class UserUpdateDTO {
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  @Length(3, 50, { message: "First name must be between 3 and 50 characters" })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @Length(3, 50, { message: "Last name must be between 3 and 50 characters" })
  lastName!: string;

  @IsEnum(Gender, { message: "Gender must be a valid enum value" })
  @IsNotEmpty()
  gender: Gender = Gender.unknown;

  public constructor(firstName: string, lastName: string, gender: Gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }
}
