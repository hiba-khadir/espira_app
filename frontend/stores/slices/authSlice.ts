import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "@/api/auth";
export interface User {
  createdAt: string;
  email: string;
  id: string;
  isVerified: boolean;
  name: string;
  phoneNumber: string;
}
export interface TokenPayload {
  message: string;
  token: string;
}
export interface AuthState {
  message: string | null;
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  message: null,
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.error = null;
    },
    setToken(state, action: PayloadAction<TokenPayload>) {
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.user = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, setToken, clearUser, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
