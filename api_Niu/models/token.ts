// Load required packages
import { Schema, model} from "mongoose";
import { Document } from "mongoose";

export interface Token extends Document {
  value: String;
  userId: String;
  clientId: String;
}

// Define our token schema
const TokenSchema   = new Schema({
  value: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

// Export the Mongoose model
export default model<Token>('Token', TokenSchema);