import axios from "axios";
import { store } from "@/stores/store";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  // const token = store.getState().auth.user?.token;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNGJkYTY2Zi0wMjU4LTQzNjgtOTEwZC03ZDhiMGQ2YTI1NzgiLCJpYXQiOjE3NzczOTk5MTEsImV4cCI6MTc3ODAwNDcxMX0.Lijf-0V5Jc7V50zTxf7t5cQGzKDICCeHQIfLW5ug80w";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
