import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { get } from "http";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "customer",
    enum: ["customer", "admin"],
  },
},
 { timestamps: true }
);

// Hash password automatically using schema middleware
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model<IUser>("User", userSchema, "users");
