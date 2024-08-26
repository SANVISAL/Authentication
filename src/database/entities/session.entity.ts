import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { SessionStatus } from "@AUTH/utils/consts/enum-column";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
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

  @Column({ type: "timestamptz", nullable: true })
  @IsOptional()
  @IsDate({ message: "Last accessed date must be a valid date!" })
  lastAccessed?: Date;

  @Column({
    type: "enum",
    enum: SessionStatus,
    default: SessionStatus.active,
  })
  @IsNotEmpty({ message: "Session status is required!" })
  status: SessionStatus = SessionStatus.active;
}
