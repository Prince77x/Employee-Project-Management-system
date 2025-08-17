// seedAdmin.js
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

async function seed() {
  await connectDB(process.env.MONGO_URI);
  const email = 'admin@example.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  await User.register(
    new User({
      name: 'Admin',
      email,
      role: 'admin',
      designation: 'Administrator',
      department: 'IT',
      contact: '0000000000',
      status: 'active'
    }),
    'Admin@123'
  );
  console.log('Admin created:', email, 'password: Admin@123');
  process.exit(0);
}

seed();
