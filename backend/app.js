// Import Express framework for building the Node.js web application
import express from 'express';

// Import body-parser middleware to handle incoming request bodies (usually JSON or URL-encoded data)
import bodyParser from 'body-parser';

// Import cors middleware to enable Cross-Origin Resource Sharing (CORS) for requests from different domains
import cors from 'cors';

// Import the auth router from the './routers/v1/auth.js' file
// This router likely handles authentication related routes (login, signup, etc.)
import authRouter from './routers/v1/auth.js';

// Import a limiter function (likely from './utils/limiter.js')
// This might be used to implement rate limiting for API endpoints to prevent abuse
import limiter from './utils/limiter.js';

// Create a new Express application instance
const app = new express();

// Apply CORS middleware to the app instance
// This allows requests from different origins (domains) to interact with the API
app.use(cors());

// Apply body-parser middleware to handle URL-encoded form data
// Set 'extended: false' for simpler parsing (without nested objects)
app.use(bodyParser.urlencoded({ extended: false }));

// Apply body-parser middleware to handle JSON data in request bodies
app.use(bodyParser.json());

// Apply the rate limiting middleware (from 'limiter.js') to the app
// This might help prevent API abuse by limiting requests per user or other criteria
app.use(limiter);

// Mount the auth router at the "/v1/auth" path
// This means any requests to "/v1/auth" will be handled by the routes defined in 'authRouter'
app.use("/v1/auth", authRouter);

// Export the Express app instance as the default export
// This allows other modules to import and use this app instance
export default app;