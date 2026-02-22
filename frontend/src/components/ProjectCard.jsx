import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// The ProjectCard component is a reusable card that shows a preview of a project
const ProjectCard = ({ project }) => {
    // This helper function gets the first two letters of a name for a placeholder avatar
    const getInitials = (name) => {
        return name ? name.substring(0, 2).toUpperCase() : '??';
    };

    return (
        <motion.div
            // Hover effect: lifts the card slightly and scales it up
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group bg-white dark:bg-[#0f172a] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-full"
        >
            {/* Project Image Section */}
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <img
                    src={project.thumbnail || "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay with a Play button linking to details */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Link to={`/projects/${project._id}`} className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                            <PlayCircle className="text-white w-8 h-8 fill-current" />
                        </div>
                    </Link>
                </div>

                {/* Badge showing project type (Static/Dynamic) */}
                <div className="absolute top-3 right-3">
                    <span className="bg-slate-900/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md border border-white/10 shadow-lg tracking-wider">
                        {project.projectType}
                    </span>
                </div>
            </div>

            {/* Content Section below the image */}
            <div className="p-5 flex flex-col flex-grow">
                {/* User Attribution: Shows who built the project */}
                <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                        {project.user?.avatar ? (
                            <img
                                src={project.user.avatar}
                                alt={project.user.name}
                                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover ring-2 ring-transparent group-hover:ring-indigo-500/30 transition-all"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-slate-700">
                                {getInitials(project.user?.name)}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">By</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 truncate max-w-[150px]">
                            {project.user?.name || "Unknown User"}
                        </p>
                    </div>
                </div>

                <Link to={`/projects/${project._id}`} className="block mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                </Link>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {project.description}
                </p>

                {/* Project Technology Tags (shows up to 3) */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                        <span key={index} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-700">
                            {tech}
                        </span>
                    ))}
                    {project.technologies?.length > 3 && (
                        <span className="px-2.5 py-1 text-slate-400 text-xs font-medium">+{project.technologies.length - 3}</span>
                    )}
                </div>

                {/* Footer of the card: Action links and creation date */}
                <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex space-x-3">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded" title="GitHub Repo">
                                <Github size={18} />
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded" title="Live Demo">
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                        {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
