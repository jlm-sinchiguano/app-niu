"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load required packages
var mongoose_1 = require("mongoose");
// Define our token schema
var TokenSchema = new mongoose_1.Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});
// Export the Mongoose model
exports.default = (0, mongoose_1.model)('Token', TokenSchema);
