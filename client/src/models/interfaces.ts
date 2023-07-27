export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  email: string;
  tokens: number;
  last_token_refresh: string;
}