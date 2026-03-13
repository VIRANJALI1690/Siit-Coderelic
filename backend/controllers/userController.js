const User = require('../models/User');

// @desc    Get user profile (Login User)
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            avatar: user.avatar,
            jobRole: user.jobRole,
            linkedin: user.linkedin,
            github: user.github,
            bio: user.bio,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get specific user by ID (Public Profile)
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.username = req.body.username || user.username;
            user.role = req.body.role || user.role;
            user.jobRole = req.body.jobRole || user.jobRole;
            user.linkedin = req.body.linkedin || user.linkedin;
            user.github = req.body.github || user.github;
            user.bio = req.body.bio || user.bio;

            if (req.file) {
                user.avatar = req.file.path;
            } else if (req.body.avatar) {
                user.avatar = req.body.avatar;
            }

            if (req.body.password) {
                if (!req.body.currentPassword) {
                    return res.status(400).json({ message: 'Please provide your current password to set a new one' });
                }

                const isMatch = await user.matchPassword(req.body.currentPassword);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }

                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                username: updatedUser.username,
                role: updatedUser.role,
                avatar: updatedUser.avatar,
                jobRole: updatedUser.jobRole,
                linkedin: updatedUser.linkedin,
                github: updatedUser.github,
                bio: updatedUser.bio,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Update Profile Error:", error);
        // Use the status code if it's already set (though we handle it above usually)
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({ message: error.message });
    }
};

module.exports = { getUserProfile, getUserById, updateUserProfile };
