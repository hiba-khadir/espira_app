import jwt from 'jsonwebtoken';
import 'dotenv/config';

const token = jwt.sign(
  { sub: '1' },
  process.env.JWT_SECRET ,
  { expiresIn: '7d' }
);

console.log(token);