import { Roles } from "@AUTH/utils/consts";

export interface IRole {
  name: Roles;
  description?: string;
}

export interface IRoleResponse extends IRole {
  id: string;
}
