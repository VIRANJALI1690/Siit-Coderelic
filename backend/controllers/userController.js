const User = require('../models/User');

// @desc    Get user profile (Logged-in User)
// @route   GET /api/users/profile
// @access  Private
// This function retrieves the profile of the user who is currently logged in.
// We identify the user by the ID attached to the request by the protect middleware.
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // We only send back the necessary fields, excluding sensitive data like password.
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
        // If the user ID in the token doesn't match any user in our database.
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get specific user by ID (Public Profile)
// @route   GET /api/users/:id
// @access  Public
// This function allows anyone to view a user's public profile by their ID.
const getUserById = async (req, res) => {
    try {
        // We search for the user and explicitly exclude the password field.
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If the ID format is invalid or another database error occurs.
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// This function allows the logged-in user to update their own profile information.
const updateUserProfile = async (req, res) => {
    // Safety check ensured by 'protect' middleware.
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // We update the fields provided in the request body. 
            // If a field isn't provided, we keep the existing value.
            user.name = req.body.name || user.name;
            user.username = req.body.username || user.username;
            user.role = req.body.role || user.role;
            user.jobRole = req.body.jobRole || user.jobRole;
            user.linkedin = req.body.linkedin || user.linkedin;
            user.github = req.body.github || user.github;
            user.bio = req.body.bio || user.bio;

            // Handle avatar image update (if a file was uploaded).
            if (req.file) {
                user.avatar = req.file.path;
            } else if (req.body.avatar) {
                user.avatar = req.body.avatar;
            }

            // If the user wants to change their password, they must provide the current password first.
            if (req.body.password) {
                if (!req.body.currentPassword) {
                    return res.status(400).json({ message: 'Please provide your current password to set a new one' });
                }

                // Verify the old password.
                const isMatch = await user.matchPassword(req.body.currentPassword);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }

                // If correct, the pre-save hook in the User model will hash this new password.
                user.password = req.body.password;
            }

            // Save the updated user document to the database.
            const updatedUser = await user.save();

            // Send back the updated profile data to the frontend.
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
        // We use the status code if it's already set to something other than 200.
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({ message: error.message });
    }
};

module.exports = { getUserProfile, getUserById, updateUserProfile };
