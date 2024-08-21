import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEnum, IsOptional } from "class-validator";
import { Roles } from "@CRUD_PG/utils/consts";
import { UserRole } from "./user-role.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: Roles, default: Roles.user })
  @IsEnum(Roles, { message: "Role must be a valid enum value" })
  name: Roles = Roles.user;

  @Column({ nullable: true })
  @IsOptional()
  description?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[];
}
