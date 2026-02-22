import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Loader2, Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// The ProjectDetails page shows all information about a single specific project
const ProjectDetails = () => {
    // Get the project ID from the URL
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the project data when the page loads
    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Call the API to get details for this specific project ID
                const { data } = await api.get(`/projects/${id}`);
                setProject(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load project details');
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    // Handle loading and error states
    if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader2 className="animate-spin w-10 h-10 text-indigo-500" /></div>;
    if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
    if (!project) return <div className="text-center mt-20 text-slate-900 dark:text-white">Project not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Navigation link to go back to the home dashboard */}
            <Link to="/" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Side: Visual Content (Video Player or Thumbnail Image) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="rounded-xl overflow-hidden shadow-2xl bg-black border border-slate-200 dark:border-slate-800">
                        {project.demoVideo ? (
                            <div className="aspect-w-16 aspect-h-9 flex items-center justify-center">
                                {/* If there's a demo video, we show it in an iframe or video player */}
                                <iframe
                                    src={project.demoVideo.includes("watch?v=") ? project.demoVideo.replace("watch?v=", "embed/") : project.demoVideo}
                                    title={project.title}
                                    className="w-full h-[400px]"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            // If no video, we just show the project thumbnail
                            <img src={project.thumbnail} alt={project.title} className="w-full h-auto object-cover max-h-[500px]" />
                        )}
                    </div>
                </motion.div>

                {/* Right Side: Information Content (Title, Description, Tech Stack, Links) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        {/* Project Type Tag and Date */}
                        <div className="flex items-center space-x-2 text-sm text-indigo-600 font-semibold mb-2">
                            <span className="bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">{project.projectType}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 dark:text-slate-400">{new Date(project.createdAt).toDateString()}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h1>

                        {/* Author Info (Student who built it) */}
                        <div className="flex items-center mb-6">
                            <img
                                src={project.user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + project.user?.name}
                                alt={project.user?.name}
                                className="w-10 h-10 rounded-full border border-slate-200 mr-3 shadow-sm"
                            />
                            <div>
                                <p className="text-slate-900 dark:text-slate-100 font-medium">By {project.user?.name}</p>
                                <p className="text-slate-500 text-sm">Student Developer</p>
                            </div>
                        </div>
                    </div>

                    {/* Long Description of the project */}
                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 border-b dark:border-slate-700 pb-2">About this project</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap py-2">
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies used in the project */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md font-medium text-sm border border-indigo-100 dark:border-indigo-800">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons: Github and Live Demo Links */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition-all hover:scale-[1.02]"
                            >
                                <Github size={20} />
                                <span>View Source</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all hover:scale-[1.02]"
                            >
                                <ExternalLink size={20} />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;
