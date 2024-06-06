// Import the 'fastest-validator' library for data validation
import validator from 'fastest-validator';

// Create a new validator instance
const v = new validator();

// Define a validation schema object
const schema = {
  // Define validation rules for each property
  name: {
    type: "string", // Must be a string
    min: 3, // Minimum length of 3 characters
    max: 255, // Maximum length of 255 characters
  },
  email: {
    type: "email", // Must be a valid email format
    min: 8, // Minimum length of 8 characters
    max: 100, // Maximum length of 100 characters
  },
  password: {
    type: "string", // Must be a string
    min: 8, // Minimum length of 8 characters
    max: 32, // Maximum length of 32 characters
  },
  // Enable strict mode to ensure all properties in the data are present in the schema
  $$strict: true,
};

// Compile the schema into a validation function
const check = v.compile(schema);

// Export the compiled validation function as the default export
// This allows other modules to import and use this function for data validation
export default check;
