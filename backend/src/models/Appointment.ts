import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for Appointment
export interface IAppointment extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  stylist: string;
}

// Define Mongoose schema for Appointment
const AppointmentSchema: Schema = new Schema<IAppointment>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  stylist: { type: String, required: true },
});

// Export Mongoose model for Appointment
export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);