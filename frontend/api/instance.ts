import axios from "axios";
import { store } from "@/stores/store";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
