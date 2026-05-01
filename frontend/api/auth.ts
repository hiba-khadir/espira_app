import { User } from "@/stores/slices/authSlice";
import instance from "./instance";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  token: string;
}

export const loginAPI = async (payload: LoginPayload): Promise<User> => {
  const { data } = await instance.post<User>("/login", payload);
  return data;
};

export const registerAPI = async (payload: RegisterPayload): Promise<User> => {
  const { data } = await instance.post<User>("/sign-up", payload);
  return data;
};

export const logoutAPI = async (): Promise<void> => {
  await instance.post("/logout");
};
