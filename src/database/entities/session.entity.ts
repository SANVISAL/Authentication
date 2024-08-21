import { IsBoolean, IsDate, IsNotEmpty } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @Column()
  @IsNotEmpty({ message: "Token is required!" })
  token!: string;

  @Column({ type: "timestamp" })
  @IsDate()
  expireAt!: Date;

  @Column({ type: "boolean", default: false })
  @IsBoolean({ message: "isDeleted must be a boolean value" })
  isDeleted: boolean = false;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
