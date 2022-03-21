// Load required packages
import {Schema, model} from "mongoose";
import { Document } from "mongoose";

export interface Client extends Document{
  name: string;
  id: string;
  secret: string;
  userId: string;
}

// Define our client schema
const ClientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  id: { type: String, required: true },
  secret: { type: String, required: true },
  userId: { type: String, required: true }
});

// Export the Mongoose model
export default model<Client>('Client', ClientSchema);