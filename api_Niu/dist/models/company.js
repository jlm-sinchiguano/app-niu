"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load required packages
var mongoose_1 = require("mongoose");
// Define our Company schema
var CompanySchema = new mongoose_1.Schema({
    name: String,
    type: String,
    quantity: Number,
    userId: String
});
// Export the Mongoose model
exports.default = (0, mongoose_1.model)('Company', CompanySchema);
