const mongoose = require('mongoose');

// This is the blueprint for a "Project" in our database
// It defines what information every project must have
const projectSchema = mongoose.Schema({
    // The user who created the project
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    // The title and description of the project
    title: { type: String, required: true },
    description: { type: String, required: true },

    // A list of technologies used (like React, Node, etc.)
    technologies: [{ type: String }],

    // Whether the project is a simple website (Static) or a full app (Dynamic)
    projectType: { type: String, enum: ['Static', 'Dynamic'], required: true },

    // Links to the code and the live version
    githubLink: { type: String },
    liveLink: { type: String },

    // The main image (thumbnail) and an optional video of the project
    thumbnail: { type: String, required: true },
    demoVideo: { type: String }, // This link comes from Cloudinary
}, {
    // This automatically records when the project was created or updated
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
