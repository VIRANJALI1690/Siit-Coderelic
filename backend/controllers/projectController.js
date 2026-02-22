const Project = require('../models/Project');

// This function gets all the projects from the database
// It can also search for projects if a "keyword" is provided
// It returns the list of projects sorted by the newest first
const getProjects = async (req, res) => {
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const projects = await Project.find({ ...keyword }).populate('user', 'name avatar').sort({ createdAt: -1 });
    res.json(projects);
};

// This function gets the details of just one specific project
// It uses the ID of the project to find it
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('user', 'name email avatar');

        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Project not found' });
    }
};

// This function creates a new project post
// It takes the title, description, and images/videos from the user
// It saves the project to the database and links it to the logged-in user
const createProject = async (req, res, next) => {
    try {
        const {
            title,
            description,
            projectType,
            githubLink,
            liveLink,
        } = req.body;

        // We handle technologies. If it's one item, we make it a list.
        let technologies = req.body.technologies;
        if (technologies && !Array.isArray(technologies)) {
            technologies = [technologies];
        }

        let thumbnail = req.body.thumbnail;
        let demoVideo = req.body.demoVideo;

        // If files (images or videos) were uploaded, we get their paths
        if (req.files) {
            if (req.files.thumbnail) {
                thumbnail = req.files.thumbnail[0].path;
            }
            if (req.files.demoVideo) {
                demoVideo = req.files.demoVideo[0].path;
            }
        }

        // We check if the required fields are filled
        if (!title || !description || !projectType || !thumbnail) {
            return res.status(400).json({ message: 'Please fill in required fields (including thumbnail)' });
        }

        // We create the new project object
        const project = new Project({
            user: req.user._id,
            title,
            description,
            technologies,
            projectType,
            githubLink,
            liveLink,
            thumbnail,
            demoVideo,
        });

        // We save it to the database
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        console.error("Create Project Error:", error);
        next(error);
    }
};

// This function allows a user to edit their own project
// It checks if the user is the one who created it before allowing changes
const updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        // Check if the person trying to update is the owner
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this project' });
        }

        let technologies = req.body.technologies || project.technologies;
        if (req.body.technologies && !Array.isArray(req.body.technologies)) {
            technologies = [req.body.technologies];
        }

        // Update the project details with the new info
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.technologies = technologies;
        project.projectType = req.body.projectType || project.projectType;
        project.githubLink = req.body.githubLink || project.githubLink;
        project.liveLink = req.body.liveLink || project.liveLink;

        // Handle image/video updates
        if (req.files) {
            if (req.files.thumbnail) {
                project.thumbnail = req.files.thumbnail[0].path;
            }
            if (req.files.demoVideo) {
                project.demoVideo = req.files.demoVideo[0].path;
            }
        } else {
            project.thumbnail = req.body.thumbnail || project.thumbnail;
            project.demoVideo = req.body.demoVideo || project.demoVideo;
        }

        // Save the updated project
        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// This function deletes a project from the database
// Only the owner of the project can delete it
const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        // Check if the person trying to delete is the owner
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this project' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// This function gets all projects belonging to the logged-in user
const getMyProjects = async (req, res) => {
    const projects = await Project.find({ user: req.user._id }).populate('user', 'name avatar').sort({ createdAt: -1 });
    res.json(projects);
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getMyProjects,
};
