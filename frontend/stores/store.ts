import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import deviceReducer from "./slices/deviceSlice";
import notifRefucer from "./slices/notifSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    devices: deviceReducer,
    notifications: notifRefucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
