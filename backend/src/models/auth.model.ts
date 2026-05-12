import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../utils/generateToken';
import { generateOtpCode, sendOtpEmail } from '../services/auth.service';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

// ─────────────────────────────────────────────
// SIGN UP
// ─────────────────────────────────────────────

export interface SignUpInput {
  name: string;
  phoneNumber: string;
  email: string;       
  password: string;
}

/**
 * Creates a new user with hashed password and no OTP yet.
 * Throws if phone/email already exists (Prisma unique constraint).
 */
export async function signUpModel(data: SignUpInput) {
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      passwordHash,
      isVerified: false,
      otpCode: null,
    },
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      email: true,
      isVerified: true,
      createdAt: true,
    },
  });

  return user;
}

// ─────────────────────────────────────────────
// REQUEST OTP
// ─────────────────────────────────────────────

/**
 * Generates a fresh OTP, stores it on the user record, and sends it via email.
 * Throws if user is not found or has no email on their account.
 */
export async function requestOtpModel(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('USER_NOT_FOUND');
 
  const otpCode = generateOtpCode();
 
  await prisma.user.update({
    where: { email },
    data: { otpCode },
  });
 
  await sendOtpEmail(email, otpCode);
}

// ─────────────────────────────────────────────
// VERIFY OTP
// ─────────────────────────────────────────────

/**
 * Compares submitted OTP against stored value.
 * On success: marks user as verified, clears OTP, returns a JWT.
 */
export async function verifyOtpModel(email: string, otpCode: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('USER_NOT_FOUND');
  if (!user.otpCode) throw new Error('OTP_NOT_REQUESTED');
  if (user.otpCode !== otpCode) throw new Error('INVALID_OTP');
 
  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      otpCode: null,
    },
  });
 
  const token = generateAccessToken(user.id);
  return { token };
}

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────

/**
 * Verifies email + password and returns a JWT on success.
 * Throws if user not found, not verified, or password mismatch.
 */
export async function loginModel(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('INVALID_CREDENTIALS');
  if (!user.isVerified) throw new Error('NOT_VERIFIED');

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) throw new Error('INVALID_CREDENTIALS');

  const token = generateAccessToken(user.id);
  return { token, user  };
}