import { Gender } from "@CRUD_PG/utils/consts/enum-column";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 50 })
  firstName: string = "";

  @Column({ type: "varchar", length: 50 })
  lastName: string = "";

  @Column({ type: "varchar", length: 50, unique: true })
  email: string = "";

  @Column({ type: "varchar", length: 100, nullable: true })
  address: string = "";

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.unknow,
  })
  gender: Gender = Gender.unknow;
}

export default User;
