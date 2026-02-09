import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for Appointment
export interface IAppointment extends Document {
  userId?: mongoose.Types.ObjectId;
  guestInfo?: {
    name: string;
    email: string;
    phone: string;
  }
  serviceId: mongoose.Types.ObjectId;
  stylistId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  notes?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updateAt: Date;
}

// Define Mongoose schema for Appointment
const AppointmentSchema: Schema = new Schema<IAppointment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  guestInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  }, serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  stylistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    maxlength: 500  // Limit notes length
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Export Mongoose model for Appointment
export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);