"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load required packages
var mongoose_1 = require("mongoose");
// Define our token schema
var CodeSchema = new mongoose_1.Schema({
    value: { type: String, required: true },
    redirectUri: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});
// Export the Mongoose model
exports.default = (0, mongoose_1.model)('Code', CodeSchema);
