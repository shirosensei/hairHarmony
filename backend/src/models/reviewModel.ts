import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for Review document
export interface IReview extends Document {
  appointmentId: mongoose.Types.ObjectId;
  
  // Customer info (denormalized for display even if user deleted)
  customerName: string;
  customerEmail: string;
  
  // User reference (REQUIRED - only registered users can review)
  userId: mongoose.Types.ObjectId;
  
  // Review content
  rating: number; // 1-5 stars
  comment?: string;
  
  // What they reviewed
  serviceId: mongoose.Types.ObjectId;
  stylistId: mongoose.Types.ObjectId;
  
  // Moderation
  isApproved: boolean;
  isVisible: boolean;
  
  // Optional response from staff
  response?: {
    text: string;
    respondedBy: mongoose.Types.ObjectId;
    respondedAt: Date;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema definition
const reviewSchema = new Schema<IReview>(
  {
    // ========== APPOINTMENT REFERENCE ==========
    // One review per appointment (unique constraint)
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: [true, 'Appointment reference is required'],
      unique: true // Ensures one review per appointment
    },
    
    // ========== CUSTOMER INFO ==========
    // Stored for display purposes (denormalized)
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true
    },
    
    // ========== USER REFERENCE ==========
    // REQUIRED: Only registered users can leave reviews
    // This prevents spam and ensures accountability
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must be logged in to leave a review']
    },
    
    // ========== REVIEW CONTENT ==========
    
    // Rating: 1-5 stars (integer only)
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      validate: {
        validator: function(v: number) {
          return Number.isInteger(v); // Must be whole number
        },
        message: 'Rating must be a whole number'
      }
    },
    
    // Optional text comment
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    
    // ========== REFERENCES ==========
    
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service reference is required']
    },
    
    stylistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stylist',
      required: [true, 'Stylist reference is required']
    },
    
    // ========== MODERATION ==========
    
    // Whether admin has approved the review
    isApproved: {
      type: Boolean,
      default: true // Auto-approve by default, can change if needed
    },
    
    // Whether review is visible to public
    isVisible: {
      type: Boolean,
      default: true
    },
    
    // ========== STAFF RESPONSE ==========
    // Optional response from salon staff to the review
    response: {
      // Response text
      text: {
        type: String,
        trim: true,
        maxlength: [500, 'Response cannot exceed 500 characters']
      },
      
      // Who responded (admin or stylist)
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      
      // When they responded
      respondedAt: {
        type: Date
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ==================== INDEXES ====================

// Find all reviews for a stylist (visible only)
reviewSchema.index({ stylistId: 1, isVisible: 1 });

// Find all reviews for a service (visible only)
reviewSchema.index({ serviceId: 1, isVisible: 1 });

// Find all reviews by a user
reviewSchema.index({ userId: 1 });

// Check if appointment has been reviewed
reviewSchema.index({ appointmentId: 1 });

// Sort by rating
reviewSchema.index({ rating: -1 });

// Sort by date (newest first)
reviewSchema.index({ createdAt: -1 });

// ==================== VIRTUAL FIELDS ====================

// Populate appointment details
reviewSchema.virtual('appointment', {
  ref: 'Appointment',
  localField: 'appointmentId',
  foreignField: '_id',
  justOne: true
});

// Populate user details
reviewSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Populate stylist details
reviewSchema.virtual('stylist', {
  ref: 'Stylist',
  localField: 'stylistId',
  foreignField: '_id',
  justOne: true
});

// Populate service details
reviewSchema.virtual('service', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true
});

// ==================== MIDDLEWARE HOOKS ====================

// After saving a review, update stylist stats
reviewSchema.post('save', async function(doc) {
  try {
    const Stylist = mongoose.model('Stylist');
    const stylist = await Stylist.findById(doc.stylistId);
    
    // Call stylist's updateStats method to recalculate average rating
    if (stylist && typeof stylist.updateStats === 'function') {
      await stylist.updateStats();
    }
  } catch (error) {
    console.error('Error updating stylist stats:', error);
  }
});

// After deleting a review, update stylist stats
reviewSchema.post('deleteOne', async function(doc) {
  try {
    const Stylist = mongoose.model('Stylist');
    const stylist = await Stylist.findById(doc.stylistId);
    
    // Call stylist's updateStats method to recalculate average rating
    if (stylist && typeof stylist.updateStats === 'function') {
      await stylist.updateStats();
    }
  } catch (error) {
    console.error('Error updating stylist stats:', error);
  }
});

// Export the model
export const Review = mongoose.model<IReview>('Review', reviewSchema);