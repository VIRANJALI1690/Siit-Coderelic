const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getMyProjects
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// This is the file we just updated with the 1000MB limit
const { upload } = require('../utils/cloudinary');

// --- IMPROVED MIDDLEWARE ---
const uploadProjectMedia = (req, res, next) => {
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'demoVideo', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            console.error("Project Media Upload Error:", err);

            // Check if the error is specifically because the file is too big
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'The video file is too large. Max limit is 1000MB.'
                });
            }

            // Handle other Multer errors (wrong format, etc.)
            return res.status(400).json({
                message: 'Upload failed: ' + err.message
            });
        }
        next();
    });
};

// --- ROUTES ---

router.route('/')
    .get(getProjects)
    .post(protect, uploadProjectMedia, createProject);

router.route('/myprojects').get(protect, getMyProjects);

router.route('/:id')
    .get(getProjectById)
    .put(protect, uploadProjectMedia, updateProject)
    .delete(protect, deleteProject);

module.exports = router;