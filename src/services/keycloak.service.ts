import { IUser } from "@AUTH/@types/user.type";
import { IKeyCloakService } from "./@types/keycloak.service.type";
import axios from "axios";
import { getConfig } from "@AUTH/utils/cofig";
import { Introspection, IToken } from "@AUTH/@types/keycloak.type";

export class KeycloakService implements IKeyCloakService {
  private readonly _config = getConfig();

  public constructor() {}

  public async obtainAccessToken(user: IUser): Promise<IToken> {
    try {
      const authorizationEndpoint = `${this._config.kcUrl}${this._config.kcAuthorization}`;
      const grantType = {
        grant_type: "password",
        client_id: this._config.kcClientID,
        client_secret: this._config.kcClientSecret,
        username: user.firstName + user.lastName,
        password: user.password,
      };

      const response = await axios.post(authorizationEndpoint, grantType);

      return response?.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async validateToken(
    token: string,
    tokenName: string
  ): Promise<Introspection> {
    try {
      const introspectionEndpoint = `${this._config.kcUrl}${this._config.kcIntrospection}`;
      const params = new URLSearchParams();
      params.append(tokenName, token);
      const response = await axios.post(introspectionEndpoint, params, {
        auth: {
          username: this._config.kcClientID || "",
          password: this._config.kcClientSecret || "",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  public async logout(
    refreshToken: string
  ): Promise<{ status: number; message: string }> {
    try {
      const endSessionEndpoint = `${this._config.kcUrl}${this._config.kcEndSession}`;
      const params = new URLSearchParams();
      params.append("refreshToken", refreshToken);
      const response = await axios.post(endSessionEndpoint, params, {
        auth: {
          username: this._config.kcClientID || "",
          password: this._config.kcClientSecret || "",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return {
        status: response.status,
        message: response.statusText,
      };
    } catch (error: unknown) {
      throw error;
    }
  }
}
