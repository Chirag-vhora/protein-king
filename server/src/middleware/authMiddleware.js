import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  console.log("AUTH MIDDLEWARE FILE LOADED");

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET is not configured' });
  }

  let decoded;

  try {
    const token = authorization.slice('Bearer '.length).trim();
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token is invalid or expired' });
  }

  try {
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user no longer exists' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default authMiddleware;
