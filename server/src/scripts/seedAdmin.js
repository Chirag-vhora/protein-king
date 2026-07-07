import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura-performance';

const seedAdmin = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for admin seeding');

    const adminEmail = (process.env.ADMIN_EMAIL || 'kingpro@aura.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'kingpro00';
    const adminName = process.env.ADMIN_NAME || 'King Pro Admin';

    // 1. Check if any admin exists or user with this email exists
    const adminExists = await User.findOne({ role: 'admin' });
    const emailExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log(`Admin user already exists: ${adminExists.email}. No action taken.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    if (emailExists) {
      console.log(`User with email ${adminEmail} already exists (role: ${emailExists.role}). No action taken.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // 2. Create the admin user
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    console.log(`Admin user successfully seeded: ${admin.email}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
