// Load required packages
import {Schema, model} from "mongoose";
import { Document } from "mongoose";

export interface Company extends Document{
  name: string;
  type: string;
  quantity: number;
  userId: string;
}

// Define our Company schema
const CompanySchema   = new Schema({
  name: String,
  type: String,
  quantity: Number,
  userId: String
});

// Export the Mongoose model
export default model<Company>('Company', CompanySchema);