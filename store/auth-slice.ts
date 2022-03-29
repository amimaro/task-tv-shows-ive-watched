import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { ILoginRequest, ILogoutRequest } from "../types/auth";
import { deleteData, postData } from "../utils/helpers";

export interface IAuthState {
  expires_at: string | null;
  request_token: string | null;
  session_id: string | null;
  account: any;
}

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: ILoginRequest) => {
    const response = await postData({
      url: "api/login",
      data: payload,
    });
    return response;
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const state: any = getState();
    const response = await deleteData({
      url: "api/logout",
      data: {
        session_id: state.auth.auth_obj.session_id,
      },
    });
    return response;
  }
);

const initialState: { auth_obj: IAuthState } = {
  auth_obj: {
    expires_at: null,
    request_token: null,
    session_id: null,
    account: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loginAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.auth_obj.expires_at = action.payload.expires_at;
        state.auth_obj.request_token = action.payload.request_token;
        state.auth_obj.session_id = action.payload.session_id;
        state.auth_obj.account = action.payload.account;
      }
    );
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.auth_obj.expires_at = null;
      state.auth_obj.request_token = null;
      state.auth_obj.session_id = null;
      state.auth_obj.account = null;
    });
  },
});

export const authActions = authSlice.actions;

export const selectIsAuth = (state: AppState) => {
  const { expires_at, request_token } = state.auth.auth_obj;
  if (!expires_at || !request_token) return false;
  const expirationDate = new Date(expires_at);
  const currentDate = new Date();
  const isOnExpirationTime =
    expirationDate.getTime() - currentDate.getTime() > 0;
  const hasRequestToken = request_token.length > 0;
  return isOnExpirationTime && hasRequestToken;
};

export default authSlice;
