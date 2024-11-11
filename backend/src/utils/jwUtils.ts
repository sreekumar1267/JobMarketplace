import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwtConfig';

export const generateToken = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
