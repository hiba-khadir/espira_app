import { User } from "@/stores/slices/authSlice";
import instance from "./instance";
import { AuthState } from "@/stores/slices/authSlice";
export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  token: string;
}

export const loginAPI = async (payload: LoginPayload): Promise<User> => {
  const { data } = await instance.post<User>("/api/authlogin", payload);
  return data;
};

export const registerAPI = async (
  payload: RegisterPayload,
): Promise<AuthState> => {
  const { data } = await instance.post<AuthState>("/api/auth/sign-up", payload);
  return data;
};

export const logoutAPI = async (): Promise<void> => {
  await instance.post("/api/authlogout");
};
