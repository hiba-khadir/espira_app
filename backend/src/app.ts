import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { runHistoryCleanup } from './services/historyCleanup';
/*routes and auth */
import authenticateToken from './middleware/auth.middleware.js';
import deviceRoutes from './routes/device.router.js';
import authRoute from "./routes/auth.router.js";
import statsRoutes from './routes/stats.router';

const app = express();

//frontend connection
app.use(cors({
    origin: 'http://localhost:5173'  //accept requests from the app's frontend only
}));

//extend files limit and use expess.json 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//defining api endpoints 
app.use("/api/devices",authenticateToken,deviceRoutes);
app.use("/api/stats",authenticateToken,statsRoutes);



// run cleaning old history once on startup then every 24 hours
runHistoryCleanup();
setInterval(runHistoryCleanup, 24 * 60 * 60 * 1000);
app.listen(3000, () => console.log("Server running on 3000"));