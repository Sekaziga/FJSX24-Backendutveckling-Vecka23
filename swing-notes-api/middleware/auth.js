// auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify JWT token
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Expected format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save userId to request object so it can be accessed in controllers
    req.userId = decoded.userId;

    next(); // Move to next middleware/route
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
}

export default authenticate;
