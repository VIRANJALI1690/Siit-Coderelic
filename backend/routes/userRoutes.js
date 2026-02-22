const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const { upload } = require('../utils/cloudinary');

const uploadAvatar = (req, res, next) => {
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            console.error("Avatar Upload Error:", err);
            return res.status(400).json({ message: 'Image upload failed. Check file type or size.' });
        }
        next();
    });
};

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, uploadAvatar, updateUserProfile);

router.route('/:id').get(getUserById);

module.exports = router;
