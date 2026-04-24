import { Request, Response } from 'express';
import {
  signUpModel,
  requestOtpModel,
  verifyOtpModel,
  loginModel,
} from '../models/auth.model';

// ─────────────────────────────────────────────
// POST /api/auth/sign-up
// Body: { name, phoneNumber, email, password }
// ─────────────────────────────────────────────
export async function signUp(req: Request, res: Response): Promise<void> {
  const { name, phoneNumber, password, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    res.status(400).json({ error: 'phoneNumber is required' });
    return;
  }
  // email is now required — OTP will be sent to it
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'a valid email is required' });
    return;
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    res.status(400).json({ error: 'password must be at least 8 characters' });
    return;
  }

  try {
    const user = await signUpModel({ name: name.trim(), phoneNumber, email, password });
    res.status(201).json({ message: 'User created. Please verify your account via email.', user });
  } catch (err: any) {
    if (err?.code === 'P2002') {
      const field = err?.meta?.target?.[0] ?? 'field';
      res.status(409).json({ error: `${field} already in use` });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ─────────────────────────────────────────────
// POST /api/auth/request-otp
// Body: { phoneNumber }
// ─────────────────────────────────────────────
export async function requestOtp(req: Request, res: Response): Promise<void> {
  const { phoneNumber } = req.body;

  if (!phoneNumber || typeof phoneNumber !== 'string') {
    res.status(400).json({ error: 'phoneNumber is required' });
    return;
  }

  try {
    await requestOtpModel(phoneNumber);
    res.status(200).json({ message: 'OTP sent to your email address' });
  } 
  // catch (err: any) {
  //   const msg = err?.message;
  //   if (msg === 'USER_NOT_FOUND') {
  //     res.status(404).json({ error: 'No account found with that phone number' });
  //   } else if (msg === 'NO_EMAIL') {
  //     res.status(400).json({ error: 'No email address associated with this account' });
  //   } else {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }
   catch (err: any) {
    console.error('[request-otp error]', err); // add this line
    const msg = err?.message;
    if (msg === 'USER_NOT_FOUND') {
      res.status(404).json({ error: 'No account found with that phone number' });
    } else if (msg === 'NO_EMAIL') {
      res.status(400).json({ error: 'No email address associated with this account' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  
}
}

// ─────────────────────────────────────────────
// POST /api/auth/verify-otp
// Body: { phoneNumber, otpCode }
// ─────────────────────────────────────────────
export async function verifyOtp(req: Request, res: Response): Promise<void> {
  const { phoneNumber, otpCode } = req.body;

  if (!phoneNumber || typeof phoneNumber !== 'string') {
    res.status(400).json({ error: 'phoneNumber is required' });
    return;
  }
  if (!otpCode || typeof otpCode !== 'string') {
    res.status(400).json({ error: 'otpCode is required' });
    return;
  }

  try {
    const result = await verifyOtpModel(phoneNumber, otpCode);
    res.status(200).json({ message: 'Account verified successfully', token: result.token });
  } catch (err: any) {
    const msg = err?.message;
    if (msg === 'USER_NOT_FOUND') {
      res.status(404).json({ error: 'No account found with that phone number' });
    } else if (msg === 'OTP_NOT_REQUESTED') {
      res.status(400).json({ error: 'No OTP was requested for this account' });
    } else if (msg === 'INVALID_OTP') {
      res.status(400).json({ error: 'Invalid OTP code' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// ─────────────────────────────────────────────
// POST /api/auth/login
// Body: { phoneNumber, password }
// ─────────────────────────────────────────────
export async function login(req: Request, res: Response): Promise<void> {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || typeof phoneNumber !== 'string') {
    res.status(400).json({ error: 'phoneNumber is required' });
    return;
  }
  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'password is required' });
    return;
  }

  try {
    const result = await loginModel(phoneNumber, password);
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (err: any) {
    const msg = err?.message;
    if (msg === 'INVALID_CREDENTIALS') {
      res.status(401).json({ error: 'Invalid phone number or password' });
    } else if (msg === 'NOT_VERIFIED') {
      res.status(403).json({ error: 'Account not verified. Please check your email for the OTP.' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// ─────────────────────────────────────────────
// POST /api/auth/logout  (protected)
// ─────────────────────────────────────────────
export async function logout(_req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: 'Logged out successfully' });
}