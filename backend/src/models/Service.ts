import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for Service
export interface IService extends Document {
  name: string;
  description: string;
  category: string;
  duration: number; // Duration in minutes
  price: number;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema for Service
const serviceSchema = new Schema<IService>({
  name: { type: String, required: [true, 'Service name is required'],
    trim: true,
    unique: true,
    minlength: [5, 'Service name must be at least 5 characters'],
          maxlength: [100, 'Service name cannot exceed 100 characters']
   },

   // Service description
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    
    // Service category (predefined list)
    category: {
      type: String,
      required: [true, 'Service category is required'],
      trim: true,
      enum: {
        values: ['Hair', 'Nails', 'Spa', 'Massage', 'Facial', 'Waxing', 'Makeup', 'Other'],
        message: 'Invalid service category'
      }
    },
    
    // Service duration in minutes (must be in 15-min increments)
    duration: {
      type: Number,
      required: [true, 'Service duration is required'],
      min: [15, 'Duration must be at least 15 minutes'],
      max: [480, 'Duration cannot exceed 8 hours'],
      validate: {
        validator: function(v: number) {
          // Ensure duration is in 15-minute increments (15, 30, 45, 60, etc.)
          return v % 15 === 0;
        },
        message: 'Duration must be in 15-minute increments'
      }
    },
    
    // Service price
    price: {
      type: Number,
      required: [true, 'Service price is required'],
      min: [0, 'Price cannot be negative']
    },
    
    // Optional image URL
    image: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL for the image']
    },
    
    // Whether service is currently offered
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true, // Auto-manage createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ==================== INDEXES ====================
serviceSchema.index({ name: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });

// ==================== VIRTUAL FIELDS ====================

// Virtual field for average rating (calculated from reviews)
serviceSchema.virtual('averageRating', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'serviceId',
  justOne: false
});


// Export model for Service
export const Service = mongoose.model<IService>("Service", serviceSchema);
