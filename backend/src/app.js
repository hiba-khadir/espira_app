const express = require("express");
const cors = require("cors");
const path = require("path");


//user authentification router
const authRoute = require("./routes/auth.router.js");
const authenticateToken = require("./middleware/auth.middelware.js");


//devices router
const deviceRoutes = require("./routes/device.router.js");
const app = express();

//stats router


//frontend connection
/*
app.use(cors({
    origin: 'http://localhost:5173'  //accept requests from the app's frontend only
}));*/

//extend files limit and use expess.json 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//defining api endpoints 
app.use("/api/devices",authenticateToken,deviceRoutes);


app.listen(3000, () => console.log("Server running on 3000"));