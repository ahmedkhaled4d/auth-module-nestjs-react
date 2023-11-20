import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  password: String,
});

export interface User extends mongoose.Document {
  username: string;
  password: string;
  role: string;
  email: string;
}
