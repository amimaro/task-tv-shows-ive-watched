import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { ILoginRequest } from "../types/auth";
import { postData } from "../utils/helpers";

export interface IAuthState {
  expires_at: string | null;
  request_token: string | null;
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

const initialState: { auth_obj: IAuthState } = {
  auth_obj: {
    expires_at: null,
    request_token: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: any) {
      state.auth_obj.expires_at = null;
      state.auth_obj.request_token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.auth_obj = action.payload;
      }
    );
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
