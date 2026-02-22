const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// This route handles creating a new account (Register)
// URL: POST /api/auth/register
router.post('/register', registerUser);

// This route handles logging into an existing account (Login)
// URL: POST /api/auth/login
router.post('/login', authUser);

module.exports = router;
