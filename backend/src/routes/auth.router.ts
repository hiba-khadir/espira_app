import { Router } from 'express';
import { signUp, requestOtp, verifyOtp, login, logout } from '../controllers/auth.controller';
import authenticateToken from '../middleware/auth.middleware';
 
const router = Router();
 
// Public routes
router.post('/sign-up', signUp);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
 
// Protected route — requires valid JWT
router.post('/logout', authenticateToken, logout);
 
export default router;
 