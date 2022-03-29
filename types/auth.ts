export type ILoginResponse = {
  expires_at: string | null;
  request_token: string | null;
  success: boolean;
};

export type ILoginRequest = {
  username: string;
  password: string;
};

export type ILogoutRequest = {
  session_id: string;
};
