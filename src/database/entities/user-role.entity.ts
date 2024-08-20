// import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./user.entity";
// import { Role } from "./role..entity";

// @Entity()
// export class UserRole {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;

//   @ManyToOne(() => User, (user) => user.userRoles)
//   @JoinColumn({ name: "userId" })
//   user!: User;

//   @ManyToOne(() => Role, (role) => role.userRoles)
//   @JoinColumn({ name: "roleId" })
//   role!: Role;
// }
