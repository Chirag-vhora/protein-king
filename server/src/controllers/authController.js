import * as authService from '../services/authService.js';
import generateToken from '../utils/generateToken.js';

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== 'string' || !name.trim()
      || typeof email !== 'string' || !email.trim()
      || typeof password !== 'string' || !password
    ) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not configured' });
    }

    const user = await authService.registerUser({ name: name.trim(), email, password });
    const token = generateToken(user._id);

    return res.status(201).json({
      user: safeUser(user),
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' || !email.trim()
      || typeof password !== 'string' || !password
    ) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not configured' });
    }

    let targetEmail = email.trim();
    if (targetEmail.toLowerCase() === 'kingpro') {
      targetEmail = process.env.ADMIN_EMAIL || 'kingpro@aura.com';
    }

    const user = await authService.authenticateUser(targetEmail, password);
    const token = generateToken(user._id);

    return res.json({
      user: safeUser(user),
      token
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user: safeUser(user) });
  } catch (error) {
    next(error);
  }
};
