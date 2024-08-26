import { User } from "../entities/user.entity";

export interface UserCreate extends Partial<User> {
  firstname: string;
  lastname: string;
}

export interface UserName extends Partial<User> {
  firstname: string;
  lastname: string;
}
