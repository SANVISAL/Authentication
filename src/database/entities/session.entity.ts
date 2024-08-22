import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { SessionStatus } from "@CRUD_PG/utils/consts/enum-column";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id!: string;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
  @IsNotEmpty()
  user!: User;

  @Column({ type: "text" })
  @IsNotEmpty({ message: "Access token is required!" })
  accessToken!: string;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  refreshToken?: string;

  @Column({ type: "timestamptz" })
  @IsDate({ message: "Expiration date must be a valid date!" })
  expireAt!: Date;

  @Column({ type: "boolean", default: false })
  @IsBoolean({ message: "isDeleted must be a boolean value" })
  isDeleted: boolean = false;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  @IsOptional()
  lastAccessed?: Date;

  @Column({
    type: "enum",
    enum: SessionStatus,
    default: SessionStatus.active,
  })
  @IsNotEmpty({ message: "Session status is required!" })
  status: SessionStatus = SessionStatus.active;
}
