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
    console.log("Update Profile Request Received");
    if (req.user) console.log("User ID:", req.user._id);
    if (req.file) console.log("File received:", req.file);
    if (req.body) {
        console.log("Body received:", JSON.stringify(req.body, null, 2));
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
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, getUserById, updateUserProfile };
