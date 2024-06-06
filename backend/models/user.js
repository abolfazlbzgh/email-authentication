// Import the Mongoose ODM library for interacting with MongoDB
import mongoose from 'mongoose';

// Define a Mongoose schema for the 'User' model
const schema = mongoose.Schema({
  // Define properties (fields) of a user document
  name: {
    type: String, // Data type is String
    required: true, // This field is required for a valid user document
  },
  email: {
    type: String, // Data type is String
    required: true, // This field is required for a valid user document
    unique: true, // Ensures email uniqueness for each user (no duplicates)
  },
  password: {
    type: String, // Data type is String (typically hashed for security)
    required: true, // This field is required for a valid user document
  },
  isVerified: {
    type: Boolean, // Data type is Boolean (indicates email verification status)
    default: false, // Default value is 'false' (user not verified initially)
  },
  verificationCode: {
    type: String, // Data type is String (used for email verification process)
  },

  passwordResetToken: {
    type: String
  },

  passwordResetExpires: {
    type: Number
  },
}, { timestamps: true }); // Enable automatic timestamps for 'createdAt' and 'updatedAt'

// Create a Mongoose model named 'User' based on the defined schema
const model = mongoose.model('User', schema);

// Export the 'User' model as the default export
// This allows other modules to import and use this model for interacting with user data in MongoDB
export default model;