import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsEnum,
  IsBoolean,
} from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Session } from "./session.entity";
import { UserRole } from "./user-role.entity";
import { Gender } from "@AUTH/utils/consts";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 50 })
  @IsNotEmpty({ message: "First name is required" })
  @Length(3, 50, { message: "First name must be between 3 and 50 characters" })
  firstName!: string;

  @Column({ type: "varchar", length: 50 })
  @IsNotEmpty({ message: "Last name is required" })
  @Length(3, 50, { message: "Last name must be between 3 and 50 characters" })
  lastName!: string;

  @Column({ type: "varchar", length: 50, unique: true })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  @IsNotEmpty({ message: "Password is required" })
  password!: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.unknown,
  })
  @IsEnum(Gender, { message: "Gender must be a valid enum value" })
  @IsNotEmpty()
  gender: Gender = Gender.unknown;

  @Column({ type: "boolean", default: false })
  @IsBoolean({ message: "isDeleted must be a boolean value" })
  isDeleted: boolean = false;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Session, (session) => session.user, { cascade: true })
  sesssions!: Session[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles!: UserRole[];
}

export { User };
