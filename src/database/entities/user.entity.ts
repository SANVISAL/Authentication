import { Gender } from "@CRUD_PG/utils/consts/enum-column";
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsEnum,
  IsOptional,
  IsBoolean,
} from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Session } from "./session.entity";
import { Role } from "./role..entity";

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

  @Column({ type: "varchar", length: 100, nullable: true })
  @IsOptional()
  @Length(8, 50, { message: "Password must be greater than 8 characters" })
  password!: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.Unknown,
  })
  @IsEnum(Gender, { message: "Gender must be a valid enum value" })
  gender: Gender = Gender.Unknown;

  @Column({ type: "boolean", default: false })
  @IsBoolean({ message: "isDeleted must be a boolean value" })
  isDeleted: boolean = false;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Session, (session) => session.user)
  sesssion!: Session[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "User Role",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "roleId", referencedColumnName: "id" },
  })
  roles!: Role[];
}

export { User };
