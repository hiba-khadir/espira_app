import { User } from "@/stores/slices/authSlice";
import instance from "./instance";
import { AuthState } from "@/stores/slices/authSlice";
import { SuccessMessage } from "./device";
import { TokenPayload } from "@/stores/slices/authSlice";
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

export const loginAPI = async (
  payload: LoginPayload,
): Promise<TokenPayload> => {
  const { data } = await instance.post<TokenPayload>("/api/authlogin", payload);
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

export const SendOTP = async (email: string): Promise<SuccessMessage> => {
  const { data } = await instance.post<SuccessMessage>(
    "/api/auth/request-otp",
    { email: email },
  );
  return data;
};
interface OtpResponse {
  message: SuccessMessage;
  token: string;
}
export const verifyOtp = async (
  email: string | undefined,
  otp: string,
): Promise<OtpResponse> => {
  const { data } = await instance.post<OtpResponse>("/api/auth/verify-otp", {
    email: email,
    otpCode: otp,
  });
  return data;
};
