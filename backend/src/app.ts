import "dotenv/config";
import express from "express";
import cors from "cors";
import { runHistoryCleanup } from "./services/historyCleanup";
/*routes and auth */
import authenticateToken from "./middleware/auth.middleware";
import deviceRoutes from "./routes/device.router";
import authRoute from "./routes/auth.router";
import statsRoutes from "./routes/stats.router";
import { connectMqtt, getMqttStatus } from "./services/mqtt/mqtt.index";

const app = express();

//frontend connection
app.use(
  cors({
    origin: process.env.FRONTEND_URL, //accept requests from the app's frontend only
  }),
);

//extend files limit and use expess.json
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/auth", authRoute);
//defining api endpoints
app.use("/api/devices", authenticateToken, deviceRoutes);
app.use("/api/stats", authenticateToken, statsRoutes);

//mqtt connexion
// get the connection status endpoint : should be requested at startup the frontend
app.get("/api/mqttStatus", (req, res) => {
  res.json({
    server: "ok",
    mqtt: getMqttStatus(),
  });
});
// run cleaning old history once on startup then every 24 hours
runHistoryCleanup();
setInterval(runHistoryCleanup, 24 * 60 * 60 * 1000);
connectMqtt();
app.listen(3000, () => console.log("Server running on 3000"));
