import User from "@CRUD_PG/database/enities/model-user";
export interface UserCreate extends Partial<User> {
  firstname: string;
  lastname: string;
}

export interface UserName extends Partial<User> {
  firstname: string;
  lastname: string;
}
