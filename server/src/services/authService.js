import User from '../models/User.js';

const normalizeEmail = (email) => email.trim().toLowerCase();

export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    const error = new Error('A user with this email already exists');
    error.status = 409;
    throw error;
  }

  // Public registration must never accept an elevated role from the request.
  return await User.create({
    name,
    email: normalizedEmail,
    password,
    role: 'user'
  });
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email: normalizeEmail(email) }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  return user;
};

export const getUserById = async (userId) => {
  return await User.findById(userId);
};
