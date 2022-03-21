"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load required packages
var mongoose_1 = require("mongoose");
// Define our client schema
var ClientSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    userId: { type: String, required: true }
});
// Export the Mongoose model
exports.default = (0, mongoose_1.model)('Client', ClientSchema);
