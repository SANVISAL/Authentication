export type gender = "male" | "female" | "others";

export interface IUser {
  firstName: string;
  lastName: string;
  // email?: string;
  // address?: string;
  // gender?: gender;
}

export interface IUserResponse extends IUser {
  id: number;
}
