import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";
import { Roles } from "@CRUD_PG/utils/consts";
import { User } from "./user.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: Roles, default: Roles.user })
  name: Roles = Roles.user;

  @Column({ nullable: true })
  @IsOptional()
  description?: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
