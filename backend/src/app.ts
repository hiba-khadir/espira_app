import 'dotenv/config';
import express from 'express';
import cors from 'cors';


/*routes and auth */
import authenticateToken from './middleware/auth.middleware.js';
import deviceRoutes from './routes/device.router.js';
import authRoute from "./routes/auth.router.js";

const app = express();

//stats router


//frontend connection
app.use(cors({
    origin: 'http://localhost:5173'  //accept requests from the app's frontend only
}));

//extend files limit and use expess.json 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//defining api endpoints 
app.use("/api/devices",authenticateToken,deviceRoutes);


app.listen(3000, () => console.log("Server running on 3000"));