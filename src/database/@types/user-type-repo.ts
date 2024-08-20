import User from "@project_name/database/models/model-user";

export interface UserCreate extends Partial<User> {
  firstname: string;
  lastname: string;
}

export interface UserName extends Partial<User> {
  firstname: string;
  lastname: string;
}
