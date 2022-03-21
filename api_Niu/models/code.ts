// Load required packages
import {Schema, model} from "mongoose";
import { Document } from "mongoose";

export interface Code extends Document {
  value: string;
  redirectUri: string;
  userId: string;
  clientId: string;
}

// Define our token schema
const CodeSchema   = new Schema({
  value: { type: String, required: true },
  redirectUri: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

// Export the Mongoose model
export default model<Code>('Code', CodeSchema);