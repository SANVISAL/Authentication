import { SessionStatus } from "@CRUD_PG/utils/consts/enum-column";

export interface ISession {
  accessToken: string;
  refreshToken: string;
  expireAt: Date;
  lastAccess: Date;
  status: SessionStatus;
}

export interface ISessionResponse extends ISession {
  id: string;
}
