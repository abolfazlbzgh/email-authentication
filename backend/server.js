// Import the Express app instance from the './app.js' file
import app from './app.js';

// Import the Mongoose ODM library for interacting with MongoDB
import mongoose from 'mongoose';

// Import the 'dotenv' package to load environment variables from a '.env' file
import 'dotenv/config';

// Read the PORT environment variable and store it in the 'port' constant
const port = process.env.PORT;

// Log the value of the PORT environment variable for debugging purposes
console.log('port = ', process.env.PORT);

// Log the value of the MONGO_URL environment variable (likely contains MongoDB connection string)
console.log('MONGO_URL = ', process.env.MONGO_URL);

// Immediately Invoked Async Function Expression (IIFE) for asynchronous execution
(async () => {
  // Connect to the MongoDB database using the MONGO_URL environment variable
  await mongoose.connect(process.env.MONGO_URL, {
    // Set options for using the latest connection features and handling promises
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log a message to the console when the connection is successful
  console.log('MongoDB Connected');
})();

// Start the Express server using the 'app.listen' method
app.listen(port, () => {
  // Callback function executed when the server starts successfully
  console.log(`Server Running on port ${port}`);
});