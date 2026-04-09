const express = require("express");
const cors = require("cors");
const path = require("path");


//user authentification router
const authRoute = require("./routes/auth.router.js");
const authenticateToken = require("./middleware/auth.middleware.js");


//products router
const productRoutes = require("./routes/product.router.js");
const productAdminRoutes = require('./routes/admin/product.admin.router.js');
const app = express();

//stats router
const adminStatsRoute = require("./routes/admin/stats.admin.router.js");

//frontend connection
app.use(cors({
    origin: 'http://localhost:5173'  //accept requests from the app's frontend only
}));

//extend files limit 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(express.json());


app.listen(3000, () => console.log("Server running on 3000"));