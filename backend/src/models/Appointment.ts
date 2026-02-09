import mongoose, { Document, Schema } from "mongoose";
import { AppointmentStatus } from '../config/constants';

// Define TypeScript interface for Appointment
export interface IAppointment extends Document {
   // Stored for both guests and registered users
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // ========== USER REFERENCE (OPTIONAL FOR GUESTS) ==========
  userId?: mongoose.Types.ObjectId; // null for guests, set for registered users
  isGuest: boolean; // true for guests, false for registered users
  
  // ========== APPOINTMENT DETAILS ==========
  serviceId: mongoose.Types.ObjectId;
  stylistId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string; // Format: "HH:mm"
  endTime: string;   // Format: "HH:mm"
  duration: number;  // Duration in minutes
  
  // ========== PRICING ==========
  totalPrice: number;
  deposit?: number;
  isPaid: boolean;
  
  // ========== NOTES ==========
  notes?: string;           // Customer notes (visible to staff)
  internalNotes?: string;   // Staff-only notes (not visible to customer)
  
  // ========== STATUS TRACKING ==========
  status: AppointmentStatus;
  confirmedBy?: mongoose.Types.ObjectId;    // Staff who confirmed
  confirmedAt?: Date;
  cancelledBy?: mongoose.Types.ObjectId;    // Who cancelled
  cancelledAt?: Date;
  cancellationReason?: string;
  
  // ========== REVIEW ==========
  reviewId?: mongoose.Types.ObjectId;       // Linked review (if reviewed)
  
  // ========== REMINDERS ==========
  reminderSent: boolean;
  
  createdAt: Date;
  updateAt: Date;
}

// Mongoose schema for Appointment
const appointmentSchema = new Schema<IAppointment>({
 // ========== CUSTOMER INFORMATION ==========
    // Always store customer info, even for registered users
    // This ensures data persists even if user deletes account
    
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true,
      match: [/^\+?[\d\s\-()]+$/, 'Please provide a valid phone number']
    },
    
    // ========== USER REFERENCE ==========
    // null for guest bookings, populated for registered users
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    
    // Flag to indicate if this is a guest booking
    isGuest: {
      type: Boolean,
      required: true,
      default: true
    },
    
    // ========== APPOINTMENT REFERENCES ==========
    
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service is required']
    },
    
    stylistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stylist',
      required: [true, 'Stylist is required']
    },
    
    // ========== DATE AND TIME ==========
    
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
      validate: {
        validator: function(v: Date) {
          // Don't allow booking appointments in the past
          return v >= new Date(new Date().setHours(0, 0, 0, 0));
        },
        message: 'Cannot book appointments in the past'
      }
    },
    
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:mm']
    },
    
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:mm']
    },
    
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [15, 'Duration must be at least 15 minutes']
    },
    
    // ========== PRICING ==========
    
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Price cannot be negative']
    },
    
    deposit: {
      type: Number,
      min: [0, 'Deposit cannot be negative']
    },
    
    isPaid: {
      type: Boolean,
      default: false
    },
    
    // ========== NOTES ==========
    
    // Customer notes (e.g., "First time client", "Allergic to X")
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      trim: true
    },
    
    // Internal staff notes (not visible to customer)
    internalNotes: {
      type: String,
      maxlength: [500, 'Internal notes cannot exceed 500 characters'],
      trim: true
    },
    
    // ========== STATUS AND TRACKING ==========
    
    // Appointment status: pending → confirmed → in-progress → completed
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
      required: true
    },
    
    // Who confirmed the appointment (staff member)
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    
    // When it was confirmed
    confirmedAt: {
      type: Date
    },
    
    // Who cancelled (customer or staff)
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    
    // When it was cancelled
    cancelledAt: {
      type: Date
    },
    
    // Why it was cancelled
    cancellationReason: {
      type: String,
      maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
    },
    
    // ========== REVIEW ==========
    
    // Reference to review (if customer left one)
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    },
    
    // ========== REMINDERS ==========
    
    // Track if reminder email/SMS was sent
    reminderSent: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ==================== INDEXES ====================

// Find guest bookings by email (for linking when user registers)
appointmentSchema.index({ customerEmail: 1, userId: 1 });

// User's appointment history (sorted by date descending)
appointmentSchema.index({ userId: 1, date: -1 });

// Stylist's schedule (find all appointments for a stylist on a date)
appointmentSchema.index({ stylistId: 1, date: 1 });

// General date/time queries
appointmentSchema.index({ date: 1, startTime: 1 });

// Filter by status
appointmentSchema.index({ status: 1 });

// IMPORTANT: Prevent double bookings
// Ensure stylist cannot have overlapping appointments
appointmentSchema.index(
  { stylistId: 1, date: 1, startTime: 1 },
  { 
    unique: true,
    // Only enforce uniqueness for non-cancelled appointments
    partialFilterExpression: { status: { $ne: AppointmentStatus.CANCELLED } }
  }
);

// ==================== VIRTUAL FIELDS ====================

// Populate service details
appointmentSchema.virtual('service', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true
});

// Populate stylist details
appointmentSchema.virtual('stylist', {
  ref: 'Stylist',
  localField: 'stylistId',
  foreignField: '_id',
  justOne: true
});

// Populate user details (if registered user)
appointmentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// ==================== INSTANCE METHODS ====================

// Check if appointment can be cancelled (24-hour rule)
appointmentSchema.methods.canBeCancelled = function(): boolean {
  // Cannot cancel if already cancelled, completed, or no-show
  if ([AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED, AppointmentStatus.NO_SHOW].includes(this.status)) {
    return false;
  }
  
  // Create full appointment datetime
  const appointmentDateTime = new Date(this.date);
  const [hours, minutes] = this.startTime.split(':').map(Number);
  appointmentDateTime.setHours(hours, minutes, 0, 0);
  
  // Calculate hours until appointment
  const hoursUntilAppointment = (appointmentDateTime.getTime() - Date.now()) / (1000 * 60 * 60);
  
  // Must be at least 24 hours away
  return hoursUntilAppointment >= 24;
};

// Check if appointment can be reviewed
appointmentSchema.methods.canBeReviewed = function(): boolean {
  // Can only review completed appointments that don't have a review yet
  return this.status === AppointmentStatus.COMPLETED && !this.reviewId;
};


// Export Mongoose model for Appointment
export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);