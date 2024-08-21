import { Roles } from "@CRUD_PG/utils/consts";

export interface IRole {
  name: Roles;
  description?: string;
}

export interface IRoleResponse extends IRole {
  id: string;
}
