import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { UserRole } from "./user-role.entity";
import { Roles } from "@AUTH/utils/consts";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id!: string;

  @Column({ type: "enum", enum: Roles, default: Roles.user })
  @IsEnum(Roles, { message: "Role must be a valid enum value" })
  name: Roles = Roles.user;

  @Column({ nullable: true })
  @IsOptional()
  description?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role, { cascade: true })
  userRoles!: UserRole[];
}
