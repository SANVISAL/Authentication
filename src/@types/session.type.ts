export interface ISession {
  token: string;
  expireAt: Date ;
}

export interface ISessionResponse extends ISession {
  id: string;
}
