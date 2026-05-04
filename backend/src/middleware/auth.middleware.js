import 'dotenv/config';
import jwt from 'jsonwebtoken';
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'No token was sent' });
        return;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.sub };
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}
export default authenticateToken;
