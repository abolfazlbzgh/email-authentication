# Email Authentication with Node.js, React, and Tailwind CSS

This project demonstrates how to implement email authentication using Node.js for the backend and React with Tailwind CSS for the frontend. It includes user registration, login, and email verification.

## Features

1. **ES Module Syntax**
   - `import` statements are used instead of `require`.

2. **Express Server**
   - An Express server is set up with routes for signup, login, and email verification.
   - MongoDB is used to store user information, and the connection is established using `mongoose`.

3. **User Schema**
   - A user schema is defined using Mongoose to handle user data in MongoDB.

4. **Signup Route**
   - Handles user registration.
   - Passwords are hashed using `bcrypt`.
   - A verification code is generated and sent via email using `nodemailer` with [Amazon SES](https://aws.amazon.com/ses/).

5. **Login Route**
   - Handles user login.
   - Checks if the user exists and if the password matches.
   - Ensures the user's email is verified.
   - A JWT token is generated for authenticated sessions.

6. **Verify Route**
   - Handles email verification.
   - Checks if the verification code matches.
   - Marks the user's email as verified.

7. **Forget Password**
   - Send email to get token.
   - If the sent token is correct, the password will be changed
   
This setup ensures a smooth registration, login, and email verification process using modern JavaScript syntax and best practices.

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/abolfazlbzgh/email-authentication.git
   ```

2. install dependencies
   ```bash
   npm install
   ```
3. configure .env file in `email-authentication/backend`
Please configure the .env file and enter the necessary variables to send email through [Amazon SES](https://aws.amazon.com/ses/).

4. Navigate to the backend directory
   ```bash
   cd email-authentication/backend
   ```
5. Start backend
   ```bash
   nodemon server
   ```
6. Start frontend
In another terminal, run the following command as root to start the React app:
   ```bash
   npm run dev
   ```

Open your browser and navigate to http://localhost:5173.


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.txt) file for details.