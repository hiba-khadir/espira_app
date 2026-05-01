import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Generates a signed JWT access token for a given user ID.
 * @param userId - The user's UUID from the database
 * @returns Signed JWT string
 */
export function generateAccessToken(userId: string): string {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );
}
