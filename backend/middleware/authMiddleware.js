const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This middleware "protects" our private routes
// It checks if the user has sent a valid token (digital ID card) in their request
// If the token is valid, it finds the user and allows the request to proceed
const protect = async (req, res, next) => {
    let token;

    // We check if the request has an "Authorization" header that starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Sometimes tokens might have extra quotes around them from storage, so we clean them up
            if (token) {
                token = token.replace(/^"|"$/g, '').trim();
            }

            // Verify the token using our secret key stored in .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database using the ID inside the token
            // We use .select('-password') so we don't accidentally send sensitive info to other functions
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // If everything is correct, we call next() to move to the controller function
            return next(); 
        } catch (error) {
            console.error('Auth Error:', error);
            // If the token is wrong or expired, we send an Unauthorized error
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If there is no token at all, we deny access
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
