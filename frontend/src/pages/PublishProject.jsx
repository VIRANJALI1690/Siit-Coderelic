import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Upload, X, Save } from 'lucide-react';

// The PublishProject page handles both creating new projects and editing existing ones
const PublishProject = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // If there is an ID in the URL, we are in "Edit Mode"
    const isEditMode = !!id;

    // We store all the project details in this formData state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        projectType: 'Dynamic',
        githubLink: '',
        liveLink: '',
        thumbnail: '',
        demoVideo: '',
        techInput: '',
        technologies: []
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);

    const { title, description, projectType, githubLink, liveLink, techInput, technologies } = formData;

    // If we are editing, we fetch the existing project data when the page loads
    useEffect(() => {
        if (isEditMode) {
            const fetchProject = async () => {
                try {
                    const { data } = await api.get(`/projects/${id}`);
                    // Fill the form with the project's current details
                    setFormData({
                        title: data.title,
                        description: data.description,
                        projectType: data.projectType,
                        githubLink: data.githubLink || '',
                        liveLink: data.liveLink || '',
                        technologies: data.technologies || [],
                        techInput: '',
                        thumbnail: data.thumbnail
                    });
                    setFetching(false);
                } catch (err) {
                    setError('Failed to load project data');
                    setFetching(false);
                }
            };
            fetchProject();
        }
    }, [id, isEditMode]);

    // Handle normal text changes in the form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // When the user presses Enter in the tech input, add it to the list
    const handleTechKeyDown = (e) => {
        if (e.key === 'Enter' && techInput.trim() !== '') {
            e.preventDefault();
            if (!technologies.includes(techInput.trim())) {
                setFormData({
                    ...formData,
                    technologies: [...technologies, techInput.trim()],
                    techInput: ''
                });
            }
        }
    };

    // Remove a technology from the list
    const removeTech = (techToRemove) => {
        setFormData({
            ...formData,
            technologies: technologies.filter(tech => tech !== techToRemove)
        });
    };

    // Handle the final form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation: must have at least one technology
        if (technologies.length === 0) {
            setError('Please add at least one technology');
            setLoading(false);
            return;
        }

        // For new projects, an image (thumbnail) is required
        if (!isEditMode && !formData.thumbnailFile) {
            setError('Please upload a thumbnail for the new project');
            setLoading(false);
            return;
        }

        // We use FormData because we are uploading files (images/videos)
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('projectType', projectType);
        data.append('githubLink', githubLink);
        data.append('liveLink', liveLink);
        technologies.forEach(tech => data.append('technologies', tech));

        if (formData.thumbnailFile) {
            data.append('thumbnail', formData.thumbnailFile);
        }
        if (formData.demoVideoFile) {
            data.append('demoVideo', formData.demoVideoFile);
        }

        try {
            if (isEditMode) {
                // If editing, use PUT to update
                await api.put(`/projects/${id}`, data);
            } else {
                // If creating new, use POST
                await api.post('/projects', data);
            }
            // Go back to the home page after success
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'publish'} project`);
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center mt-20 text-slate-900 dark:text-white">Loading project data...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Smooth animation for the form container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700"
            >
                <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white border-b pb-4 dark:border-slate-700 flex items-center">
                    {isEditMode ? <><Save className="mr-3 text-indigo-500" /> Edit Project</> : <><Upload className="mr-3 text-indigo-500" /> Publish New Project</>}
                </h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title Input */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Title</label>
                            <input type="text" name="title" value={title} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" placeholder="e.g. Siit Coderelic" />
                        </div>

                        {/* Description Input */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                            <textarea name="description" value={description} onChange={handleChange} required rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" placeholder="Describe your project..." />
                        </div>

                        {/* Dropdown for Static vs Dynamic */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
                            <select name="projectType" value={projectType} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all">
                                <option value="Static">Static</option>
                                <option value="Dynamic">Dynamic</option>
                            </select>
                        </div>

                        {/* Tech Tag Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Technologies Used (Press Enter to add)</label>
                            <input type="text" name="techInput" value={techInput} onChange={handleChange} onKeyDown={handleTechKeyDown} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" placeholder="React, Node.js..." />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {technologies.map((tech, index) => (
                                    <span key={index} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-full flex items-center border border-indigo-100 dark:border-indigo-800">
                                        {tech}
                                        <button type="button" onClick={() => removeTech(tech)} className="ml-1 text-indigo-500 hover:text-indigo-800 dark:hover:text-white">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub Repository Link</label>
                            <input type="url" name="githubLink" value={githubLink} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" placeholder="https://github.com/..." />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Live Demo Link</label>
                            <input type="url" name="liveLink" value={liveLink} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" placeholder="https://..." />
                        </div>

                        {/* File Uploads Section */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                {isEditMode ? 'Update Thumbnail (Leave empty to keep current)' : 'Thumbnail (Image)'}
                            </label>
                            <input type="file" accept="image/*" name="thumbnail" onChange={(e) => setFormData({ ...formData, thumbnailFile: e.target.files[0] })} required={!isEditMode} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                {isEditMode ? 'Update Demo Video' : 'Demo Video (Optional)'}
                            </label>
                            <input type="file" accept="video/*" name="demoVideo" onChange={(e) => setFormData({ ...formData, demoVideoFile: e.target.files[0] })} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 hover:shadow-lg transform transition hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (isEditMode ? 'Updating...' : 'Publishing...') : (
                                <>
                                    {isEditMode ? <Save size={20} className="mr-2" /> : <Upload size={20} className="mr-2" />}
                                    {isEditMode ? 'Update Project' : 'Publish Project'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PublishProject;
