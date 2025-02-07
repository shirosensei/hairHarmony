import mongoose from "mongoose";

// Define TypeScript interface for Service
export interface IService extends mongoose.Document {
  name: string;
//   description: string;
  duration: string;
  price: string;
}

// Define Mongoose schema for Service
const ServiceSchema = new mongoose.Schema<IService>({
  name: { type: String, required: true },
//   description: { type: String, required: true },
    duration: { type: String, required: true },
  price: { type: String, required: true },
});

// Export Mongoose model for Service
const Service = mongoose.model<IService>("Service", ServiceSchema, "services");
export default Service;