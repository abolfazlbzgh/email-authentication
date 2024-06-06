// Import the Express framework for building the Node.js web application router
import express from 'express';

// Import specific functions from the '../../controllers/v1/auth.js' file
// These functions likely handle authentication related tasks (signup, login, verify, getMe)
import { getMe, verify, login, signup, changePassword ,requestPasswordChange } from '../../controllers/v1/auth.js';

// Create a new Express router instance
const router = express.Router();

// Define routes for authentication using the imported functions from 'auth.js'
// These routes handle HTTP POST and GET requests:
router.post('/signup', signup); // Signup route (likely creates a new user)
router.post('/login', login); // Login route (likely verifies credentials and generates token)
router.post('/verify', verify); // Verify email route (likely confirms email and activates account)
router.get('/me', getMe); // Get user details route (likely retrieves information about the authenticated user)
router.post('/requestPasswordChange', requestPasswordChange); 
router.post('/changePassword', changePassword); 

// Export the router instance as the default export
// This allows other modules to import and use this router for specific routes
export default router;