import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationPayload {
  message: string[];
}
const initialState: NotificationPayload = {
  message: [],
};
const NotifSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotif(state, action: PayloadAction<string[]>) {
      state.message = action.payload;
    },
    updateNotif(
      state,
      action: PayloadAction<{
        newMessage: string;
      }>,
    ) {
      state.message = [...state.message, action.payload.newMessage];
    },
  },
});

export const { updateNotif, setNotif } = NotifSlice.actions;
export default NotifSlice.reducer;
