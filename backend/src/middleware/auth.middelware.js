import jwt from "jsonwebtoken";

const jwt = require('jsonwebtoken');
require('dotenv').config({override:true});

//generate 
function authenticateToken (req ,res ,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401);

    //else verify token 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ,
        (err, pl)=>{
            if (err) 
                return res.status(403).send('invalid token');
            req.pl = pl;
            next();
        }
    )
}
module.exports = authenticateToken;