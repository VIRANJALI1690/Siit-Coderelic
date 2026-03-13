const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This middleware "protects" our private routes
// It checks if the user has sent a valid token (ID card) in their request
// If the token is valid, it finds the user and allows the request to proceed
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (token) {
                token = token.replace(/^"|"$/g, '').trim();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            return next(); // Return here to prevent further execution
        } catch (error) {
            console.error('Auth Error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
