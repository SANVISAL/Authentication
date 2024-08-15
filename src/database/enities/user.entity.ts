import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar", length: 50 })
  firstName: string = "";
  @Column({ type: "varchar", length: 50 })
  lastName: string = "";
}

export default User;
