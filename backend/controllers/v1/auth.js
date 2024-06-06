import userModel from '../../models/user.js'; // Import the user model
import registerValidator from '../../validators/register.js'; // Import the register validator
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import JWT for token generation
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Signup function
const signup = async (req, res) => {

  // Validate user input using the imported validator
  const validationResult = registerValidator(req.body);
  if (validationResult !== true) {
    return res.status(422).json(validationResult); // Return validation errors
  }

  // Extract user details from the request body
  const { name, email, password } = req.body;

  // Check if a user with the email already exists
  const isUserExists = await userModel.findOne({
    $or: [{ email }] // Search for users with matching email
  });
  if (isUserExists) {
    return res.status(409).json("Email is not valid");// More specific message can be used
  }

  // Hash the password before storing it in the database
  const hashPassword = await bcrypt.hash(password, 10);

  // Generate a random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Create a new user document with hashed password and verification code
  const user = await userModel.create({
    email,
    name,
    password: hashPassword,
    isVerified: false, // User is not verified by default
    verificationCode
  });


  // Configure nodemailer with AWS SES SMTP credentials
  if (process.env.SMTP_USER == 'YOUR_AMAZON_SES_SMTP_USERNAME') { //If it is not configured, only a success message will be sent
    // Return success response
    return res.status(201).json('Register successfully');

  } else {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Send email with the token
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verification Code',
      text: `Enter the following code for verification\n\n` +
        `${verificationCode}\n\n`

    };


    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('A verification email has been sent to ' + email);
    });

  }



  // Return success response
  return res.status(201).json('Register successfully');
};

// Login function
const login = async (req, res) => {
  // 1. Extract email and password from request body
  const { email, password } = req.body;

  // 2. Find user by email in the database
  const user = await userModel.findOne({ email });

  // 3. Check if user exists and password matches
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // User not found or password incorrect
    return res.status(400).send('Invalid email or password');
  }

  // 4. Generate JWT token with user ID and secret key
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30 day' });

  // 6. Send successful login response with token
  res.status(200).json({ token });
};


const requestPasswordChange = async (req, res) => {
  const { email } = req.body;

  // 1. Find user by email in the database
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email');
  }

  // 2. Generate a verification token
  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
  // 3. Save the token to the user's document
  await user.save();


  if (process.env.SMTP_USER == 'YOUR_AMAZON_SES_SMTP_USERNAME') {//If it is not configured, only a success message will be sent
    res.status(200).send('A verification email has been sent to ' + email);
  } else {
    // 4. Configure nodemailer with AWS SES SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // 5. Send email with the token
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Change Request',
      text: `You are receiving this because you (or someone else) have requested to change the password for your account.\n\n` +
        `Please use the following token to change your password:\n\n` +
        `${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('A verification email has been sent to ' + email);
    });
  }


};

const changePassword = async (req, res) => {
  const { email, password, token } = req.body;

  // 1. Find user by email and token in the database
  const user = await userModel.findOne({
    email,
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() } // Check if token is still valid
  });

  // 2. Check if user exists and token is valid
  if (!user) {
    return res.status(400).send('Invalid email or token');
  }

  // 3. Update the user's password
  // Hash the password before storing it in the database
  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;
  user.passwordResetToken = undefined; // Clear the token
  user.passwordResetExpires = undefined; // Clear the token expiry time

  // 4. Save the updated user document
  await user.save();

  res.status(200).send('Password changed successfully');
};


// Verify email function
const verify = async (req, res) => {
  // 1. Extract email and verification code from request body
  const { email, code } = req.body;

  // 2. Find user by email in the database
  const user = await userModel.findOne({ email });

  // 3. Check if user exists and verification code matches
  if (!user || user.verificationCode !== code) {
    return res.status(400).send('Invalid verification code');
  }

  // 4. Set user to verified and remove verification code
  user.isVerified = true;
  user.verificationCode = undefined;

  // 5. Save the updated user document
  await user.save();

  // 6. Generate JWT token with user ID and secret key
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30 day' });

  // 7. Send successful verify response with token
  res.status(200).json({ token });
};

// Get user details function
const getMe = async (req, res) => {
  // 1. Check for Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Unauthorized request: missing or invalid token format
    return res.status(401).send('Unauthorized: Missing token');
  }

  // 2. Extract token from header
  const token = authHeader.split(' ')[1];

  // 3. Verify token using JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract user ID from decoded payload

    // 4. Find user by ID (excluding sensitive fields)
    const user = await userModel.findById(userId, {
      password: 0, // Exclude password from query projection
      isVerified: 0, // Exclude verification status
      verificationCode: 0, // Exclude verification code
      createdAt: 0, // Exclude creation timestamp
      updatedAt: 0, // Exclude update timestamp
      __v: 0, // Exclude version field (Mongoose internal)
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // 5. Create a copy of the user object (optional, for safety)
    const filteredUser = { ...user._doc };

    // 6. Optionally delete additional fields from the copy (e.g., _id)
    // delete filteredUser._id; // Uncomment if needed

    // 7. Send successful response with filtered user data
    return res.status(200).json({ user: filteredUser });
  } catch (error) {
    // Handle JWT verification errors
    return res.status(401).send('Invalid token');
  }
};

export { getMe, verify, login, signup, changePassword, requestPasswordChange };