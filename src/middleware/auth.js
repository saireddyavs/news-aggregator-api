const jwt = require('jsonwebtoken');
require('dotenv').config();
const { newApiError } = require('../errors/apiError');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  // Get the JWT token from the request headers
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json(
        newApiError('ERR_NEW_AGG_UNAUTHORIZED', 'Authorization header missing')
      );
  }

  // Split the authHeader to separate the keyword and token
  const [keyword, token] = authHeader.split(' ');

  if (!keyword || keyword.toLowerCase() !== 'jwt' || !token) {
    return res
      .status(401)
      .json(
        newApiError('ERR_NEW_AGG_UNAUTHORIZED', 'Invalid authorization format')
      );
  }

  try {
    // Verify the JWT token
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
      if (err) {
        // TODO: need to learn how to expire a token
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .json(newApiError('ERR_NEW_AGG_UNAUTHORIZED', 'Token has expired'));
        }
        return res
          .status(403)
          .json(newApiError('ERR_NEW_AGG_UNAUTHORIZED', 'Invalid token'));
      }

      // Store the decoded token in the request object
      req.userID = decoded.id;
      next();
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', message: 'An error occurred' });
  }
};

module.exports = { authenticateToken };
