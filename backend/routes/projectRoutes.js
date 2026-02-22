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

const { upload } = require('../utils/cloudinary');


const uploadProjectMedia = (req, res, next) => {
    upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'demoVideo', maxCount: 1 }])(req, res, (err) => {
        if (err) {
            console.error("Project Media Upload Error:", err);
            return res.status(400).json({ message: 'File upload failed. Check file types (Image/Video) or size.' });
        }
        next();
    });
};

router.route('/')
    .get(getProjects)
    .post(protect, uploadProjectMedia, createProject);

router.route('/myprojects').get(protect, getMyProjects);

router.route('/:id')
    .get(getProjectById)
    .put(protect, uploadProjectMedia, updateProject)
    .delete(protect, deleteProject);

module.exports = router;
