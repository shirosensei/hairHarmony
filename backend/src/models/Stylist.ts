import mongoose from "mongoose";

// Define TypeScript interface for Stylist
export interface IStylist extends mongoose.Document {
  name: string;
  specialty: string;
  experience: string;
}

// Define Mongoose schema for Stylist
const StylistSchema = new mongoose.Schema<IStylist>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
});

// Export Mongoose model for Stylist
const Stylist = mongoose.model<IStylist>("Stylist", StylistSchema, "stylists");
export default Stylist;