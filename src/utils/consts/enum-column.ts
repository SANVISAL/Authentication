export enum Gender {
  male = "male",
  female = "female",
  other = "other",
  unknown = "unknown",
}

export enum Roles {
  user = "user",
  admin = "admin",
  superAdmin = "super_admin",
}

export enum SessionStatus {
  active = "active",
  expire = "expired",
  terminated = "terminated",
}

interface RoleScopesType {
  [key: string]: string[]; // Index signature for string keys
}

export const RoleScopes: RoleScopesType = {
  [Roles.user]: ["read:profile"],
  [Roles.admin]: ["read:profile", "write:profile"],
  [Roles.superAdmin]: ["read:profile", "write:profile", "delete:profile"],
};
