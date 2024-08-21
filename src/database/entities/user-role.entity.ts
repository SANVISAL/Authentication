import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role..entity";

@Entity()
export class UserRole {
  @PrimaryColumn("uuid")
  userId!: string;

  @PrimaryColumn("uuid")
  roleId!: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: "roleId" })
  role!: Role;
}
