const jwt = require('jsonwebtoken');

// Secret key for signing and verifying JWT tokens
const secretKey = '123456789'; // Replace with a secure secret key in a real application

// Function to generate a JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    console.error('Unauthorized: Token not provided');
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Unauthorized: Invalid token', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    req.userId = decoded.userId;
    next();
  });
}



module.exports = {
  generateToken,
  verifyToken,
};
