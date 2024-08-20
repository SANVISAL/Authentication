import { IsNotEmpty } from "class-validator";
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
  expireAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
