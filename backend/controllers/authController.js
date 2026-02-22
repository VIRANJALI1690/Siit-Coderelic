const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// This function creates a secret "token" (JWT) for the user
// This token is like a digital ID card that the user uses to stay logged in
// It takes the user's ID and signs it with a secret key
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// This function handles Registering a new user
// It takes name, email, password, and username from the frontend
// It checks if the user already exists, then creates a new user in the database
const registerUser = async (req, res) => {
    const { name, email, password, username } = req.body;

    // First, we check if an account with this email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Next, we check if the username is already taken
    if (username) {
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }
    }

    // If everything is okay, we try to create the user
    try {
        const user = await User.create({
            name,
            email,
            password,
            username: username || email.split('@')[0],
        });

        // If the user is successfully created, we send back their data and a token
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                token: generateToken(user._id),
                avatar: user.avatar,
            });
        }
    } catch (error) {
        // This handles cases where the username or email might still conflict
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` });
        }
        res.status(400).json({ message: 'Invalid user data', error: error.message });
    }
};

// This function handles User Login
// It checks if the email and password provided are correct
// If they match, it sends back the user info and a new token
const authUser = async (req, res) => {
    const { email, password } = req.body;

    // Search for the user by their email
    const user = await User.findOne({ email });

    // If user is found and password matches, we log them in
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            avatar: user.avatar,
            token: generateToken(user._id),
            jobRole: user.jobRole,
            linkedin: user.linkedin,
            github: user.github,
            bio: user.bio,
        });
    } else {
        // If login fails, we send an error message
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, authUser };
