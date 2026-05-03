import { AuthState } from "@/stores/slices/authSlice";
import instance from "./instance";

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

export interface RequestOtpPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otpCode: string;
}

// Backend returns { message, user, token } on sign-up
export interface SignUpResponse {
  message: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    isVerified: boolean;
    createdAt: string;
  };
  token: string;
}

// Backend returns { message, token } on login
export interface LoginResponse {
  message: string;
  token: string;
}

// Backend returns { message } on request-otp
export interface RequestOtpResponse {
  message: string;
}

// Backend returns { message, token } on verify-otp
export interface VerifyOtpResponse {
  message: string;
  token: string;
}

export const loginAPI = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await instance.post<LoginResponse>("/api/auth/login", payload);
  return data;
};

export const registerAPI = async (
  payload: RegisterPayload,
): Promise<SignUpResponse> => {
  const { data } = await instance.post<SignUpResponse>("/api/auth/sign-up", payload);
  return data;
};

export const requestOtpAPI = async (
  payload: RequestOtpPayload,
): Promise<RequestOtpResponse> => {
  const { data } = await instance.post<RequestOtpResponse>("/api/auth/request-otp", payload);
  return data;
};

export const verifyOtpAPI = async (
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> => {
  const { data } = await instance.post<VerifyOtpResponse>("/api/auth/verify-otp", payload);
  return data;
};

export const logoutAPI = async (): Promise<void> => {
  await instance.post("/api/auth/logout");
};
