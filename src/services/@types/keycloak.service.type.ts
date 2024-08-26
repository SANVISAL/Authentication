import { Introspection, IToken } from "@AUTH/@types/keycloak.type";
import { IUser } from "@AUTH/@types/user.type";

export interface IKeyCloakService {
  obtainAccessToken(user: IUser): Promise<IToken>;
  validateToken(token: string, tokenName: string): Promise<Introspection>;
  logout(refreshToken: string): Promise<{ status: number; message: string }>;
}
