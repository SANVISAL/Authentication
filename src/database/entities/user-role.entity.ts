import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role..entity";
import { IsUUID } from "class-validator";

@Entity()
export class UserRole {
  @PrimaryColumn("uuid")
  @IsUUID()
  userId!: string;

  @PrimaryColumn("uuid")
  @IsUUID()
  roleId!: string;

  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "roleId" })
  role!: Role;
}
