import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../config/constants';

// TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  
  // Customer preferences (optional)
  preferences?: {
    favoriteServices?: mongoose.Types.ObjectId[];
    preferredStylist?: mongoose.Types.ObjectId;
    notes?: string;
  };
  
  // Timestamps (auto-managed by Mongoose)
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  
  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  getPublicProfile(): object;
}

// Mongoose schema definition
const userSchema = new Schema<IUser>(
  {
    // User's full name
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    
    // User's email (unique, used for login)
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true, // Always store in lowercase
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    
    // User's phone number
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\+?[\d\s\-()]+$/, 'Please provide a valid phone number']
    },
    
    // Hashed password (never sent to client by default)
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false // Don't include password in query results by default
    },
    
    // User role: customer, stylist, or admin
    role: {
      type: String,
      enum: Object.values(UserRole), // Only allow defined roles
      default: UserRole.CUSTOMER,
      required: true
    },
    
    // Whether the user account is active
    isActive: {
      type: Boolean,
      default: true
    },
    
    // Email verification status
    emailVerified: {
      type: Boolean,
      default: false
    },
    
    // Phone verification status
    phoneVerified: {
      type: Boolean,
      default: false
    },
    
    // Customer preferences (for personalization)
    preferences: {
      // Array of favorite service IDs
      favoriteServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }],
      
      // Preferred stylist ID
      preferredStylist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stylist'
      },
      
      // Any custom notes
      notes: {
        type: String,
        maxlength: 500
      }
    },
    
    // Last login timestamp
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtual fields when converting to JSON
    toObject: { virtuals: true }
  }
);

// ==================== INDEXES ====================
// Speed up queries on these fields
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });

// ==================== MIDDLEWARE ====================

// Pre-save hook: Hash password before saving to database
userSchema.pre('save', async function (next) {
  // Only hash if password is modified (new user or password change)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// ==================== INSTANCE METHODS ====================

// Method to compare password during login
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    // Compare plain text password with hashed password
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
    emailVerified: this.emailVerified,
    preferences: this.preferences,
    createdAt: this.createdAt
  };
};

// ==================== VIRTUAL FIELDS ====================

// Virtual field to populate user's appointments (not stored in DB)
userSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'userId'
});

// Export the model
export const User = mongoose.model<IUser>('User', userSchema);