export interface IToken {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

export interface Introspection {
  active: boolean;
  exp?: number; // Expiration time (in seconds since epoch)
  iat?: number; // Issued at (in seconds since epoch)
  nbf?: number; // Not before (in seconds since epoch)
  aud?: string | string[]; // Audience
  sub?: string; // Subject (the user ID)
  iss?: string; // Issuer
  jti?: string; // JWT ID
  scope?: string; // Scope of the token
  client_id?: string; // Client ID
  username?: string; // Username of the user
  email?: string; // User's email
  [key: string]: any; // Allow additional fields
}
