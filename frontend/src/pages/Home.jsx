import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

// The Home page shows a list of all projects uploaded by students
const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This runs as soon as the page loads
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // We ask the backend for the list of projects
                const { data } = await api.get('/projects');
                setProjects(data);
                setLoading(false);
            } catch (err) {
                // If something goes wrong, we show an error message
                setError('Failed to load projects');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // This is a "Skeleton" loader. 
    // It shows grey boxes while the real projects are still loading.
    const ProjectsSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">
                    <div className="h-48 bg-slate-200 dark:bg-slate-800"></div>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // If there was an error, we show this message
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* If still loading, show the skeleton boxes */}
                {loading ? (
                    <ProjectsSkeleton />
                ) : projects.length === 0 ? (
                    // If no projects exist yet, show this message
                    <div className="text-center py-20 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found yet.</p>
                        <p className="text-sm text-slate-400 mt-2">Be the first to share your work!</p>
                    </div>
                ) : (
                    // This is the grid that displays all the projects
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
