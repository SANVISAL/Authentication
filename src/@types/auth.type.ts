export interface ILoginUser {
  email: string;
  password: string;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
  expireAt: Date;
}
