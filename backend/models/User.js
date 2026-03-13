const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        // Internal data fields for the user
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
        role: { type: String, enum: ['Student', 'Professional', 'Recruiter'], default: 'Student' },
        
        // Social and professional links
        jobRole: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        bio: { type: String, default: '' },
    },
    {
        // Automatically creates 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

// This helper function safely compares an entered password with the hashed one in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// This "hook" runs every time a user is saved to the database
// If the password was changed, we encrypt (hash) it before storage for maximum security
userSchema.pre('save', async function () {
    // If the password was not modified, we don't need to re-hash it
    if (!this.isModified('password')) {
        return;
    }

    // We generate a "salt" (random data) to make the encryption stronger
    const salt = await bcrypt.genSalt(10);
    // Finally, we replace the plain text password with the encrypted hash
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
