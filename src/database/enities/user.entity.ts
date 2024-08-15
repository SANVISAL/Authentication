import { Gender } from "@CRUD_PG/utils/consts/enum-column";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  firstName: string = "";

  @Column({ type: "varchar", length: 50 })
  lastName: string = "";

  @Column({ length: 50 })
  email: string = "";

  @Column()
  address: string = "";

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender!: Gender;
}

export default User;
