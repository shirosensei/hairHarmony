import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for Stylist
export interface IStylist extends Document {
  userId: mongoose.Types.ObjectId; // Reference to user model
  name: string;
  bio?: string;
  specialty: string[];
  experience: string;
  profileImage?: string;

  // Stats (calculated or cached)
  averageRating?: number;
  totalReviews: number;
  totalAppointments: number;

  // Availability
  isActive: boolean;
  availability?: {
    monday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
    tuesday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
    wednesday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
    thursday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
    friday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
    saturday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
    sunday?: { start: string; end: string; breaks?: { start: string; end: string }[] };
  };

  createdAt: Date;
  updatedAt: Date;
}

// Schema for time slots (used in breaks)
const timeSlotSchema = new Schema({
  start: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:mm']
  },
  end: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:mm']
  }
}, { _id: false }); // Don't create _id for subdocuments

// Schema for daily availability
const dayAvailabilitySchema = new Schema({
  start: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:mm']
  },
  end: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:mm']
  },
  breaks: [timeSlotSchema] // Array of break times
}, { _id: false });


// Define Mongoose schema for Stylist
const stylistSchema = new Schema<IStylist>(
 {
    // Reference to User model (one-to-one relationship)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true // Each user can only be one stylist
    },
    
    // Stylist's display name
    name: {
      type: String,
      required: [true, 'Stylist name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    
    // Short biography
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    
    // Array of specialties (e.g., ["Hair Coloring", "Haircuts"])
    specialty: {
      type: [String],
      required: [true, 'At least one specialty is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one specialty is required'
      }
    },
    
    // Experience description (e.g., "5 years", "10+ years")
    experience: {
      type: String,
      required: [true, 'Experience is required'],
      trim: true
    },
    
    // Profile picture URL
    profileImage: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL for the image']
    },
    
    // ========== STATS ==========
    
    // Average rating (0-5, calculated from reviews)
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    
    // Total number of reviews
    totalReviews: {
      type: Number,
      default: 0,
      min: 0
    },
    
    // Total appointments completed
    totalAppointments: {
      type: Number,
      default: 0,
      min: 0
    },
    
    // Whether stylist is currently accepting appointments
    isActive: {
      type: Boolean,
      default: true
    },
    
    // ========== AVAILABILITY ==========
    // Weekly schedule with optional break times
    availability: {
      monday: dayAvailabilitySchema,
      tuesday: dayAvailabilitySchema,
      wednesday: dayAvailabilitySchema,
      thursday: dayAvailabilitySchema,
      friday: dayAvailabilitySchema,
      saturday: dayAvailabilitySchema,
      sunday: dayAvailabilitySchema
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ==================== INDEXES ====================
stylistSchema.index({ userId: 1 });
stylistSchema.index({ isActive: 1 });
stylistSchema.index({ averageRating: -1 }); // Sort by rating descending



// ==================== VIRTUAL FIELDS ====================

// Virtual field to populate stylist's appointments
stylistSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'stylistId'
});

// Virtual field to populate stylist's reviews
stylistSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'stylistId'
});

// ==================== INSTANCE METHODS ====================

// Method to update stylist stats (called after review changes)
stylistSchema.methods.updateStats = async function() {
  const Review = mongoose.model('Review');
  
  // Find all visible reviews for this stylist
  const reviews = await Review.find({ stylistId: this._id, isVisible: true });
  
  if (reviews.length > 0) {
    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / reviews.length;
    this.totalReviews = reviews.length;
  } else {
    // No reviews yet
    this.averageRating = 0;
    this.totalReviews = 0;
  }
  
  await this.save();
};


// Export model for Stylist
export const Stylist = mongoose.model<IStylist>("Stylist", stylistSchema);