// models/User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  designation: { type: String },
  department: { type: String },
  contact: { type: String },
  profileImage: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: { UserExistsError: 'A user with the given email is already registered' }
});

module.exports = mongoose.model('User', UserSchema);
