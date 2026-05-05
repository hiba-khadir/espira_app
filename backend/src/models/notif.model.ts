import { Request, Response } from "express";
import { ConnectionStatus, DeviceType } from "../generated/prisma";
export interface notificationPayload {
  device: string;
  state: boolean;
}
export const sendNotificationModel = async (
  res: Response,
  payload: notificationPayload,
) => {
  const notification = `your ${payload.device} is  being turned ${payload.state == true ? "on" : "off"}`;
  if (res.statusCode === 200) {
    return res.status(200).json({ message: "notification", notification });
  } else {
    return res.status(200).json({
      message: "notification",
      notification: "couldn't preceed action ",
    });
  }
};
