const jwt = require('jsonwebtoken');
require('dotenv').config({override:true});

//authenticate token : verifies if access token send with request is valid
function authenticateToken (req ,res ,next){
    const authHeader = req.headers['authorization'];  //token field
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('No token was sent');

    //else verify token 
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)  // verifies signature + expiry
        req.user = { id: payload.sub }  //get id from verified token & attach to req
        next()
    }catch {
        res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = authenticateToken;