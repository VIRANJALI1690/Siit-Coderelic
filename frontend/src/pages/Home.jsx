import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../context/AuthContext';
import { Search, Filter } from 'lucide-react';

// The Home page shows a list of all projects uploaded by students (Dashboard)
// OR a landing page for first-time visitors
const Home = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchInputRef = useRef(null);

    // This runs as soon as the page loads
    useEffect(() => {
        // Only fetch projects if the user is authenticated
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            try {
                // We ask the backend for the list of projects
                const { data } = await api.get('/projects');
                setProjects(data);
                setFilteredProjects(data);
                setLoading(false);
            } catch (err) {
                // If something goes wrong, we show an error message
                setError('Failed to load projects');
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);

    // Handle focus from Navbar search button
    useEffect(() => {
        if (location.state?.focusSearch && searchInputRef.current) {
            searchInputRef.current.focus();
            searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Clear state so it doesn't refocus on every render
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Filtering logic
    useEffect(() => {
        let result = projects;

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(project =>
                project.title.toLowerCase().includes(lowerTerm) ||
                project.technologies.some(tech => tech.toLowerCase().includes(lowerTerm)) ||
                (project.user && project.user.name.toLowerCase().includes(lowerTerm))
            );
        }

        if (filterType !== 'All') {
            result = result.filter(project => project.projectType === filterType);
        }

        setFilteredProjects(result);
    }, [searchTerm, filterType, projects]);

    // This is a "Skeleton" loader. 
    const ProjectsSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#FFFFFF] dark:bg-[#111827] rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#1F2937]">
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

    // LANDING PAGE UI (For Guests)
    if (!user) {
        return (
            <div className="h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B1120] px-4">
                <div className="max-w-[650px] mx-auto w-full">
                    <div className="text-center space-y-6">
                        {/* Website Name & Tagline */}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0F172A] dark:text-[#F1F5F9]">
                                The <span className="text-[#4F46E5] dark:text-[#6366F1]">Platform</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-[#475569] dark:text-[#94A3B8] font-medium leading-[1.6]">
                                Where Seniors Build. Juniors Get Inspired.
                            </p>
                        </div>

                        {/* New Text and Login/Register Buttons */}
                        <div className="py-4">
                            <p className="text-xl md:text-2xl text-[#475569] dark:text-[#94A3B8] font-medium leading-[1.6]">
                                Your final year project is your opportunity to shape the next generation of coders. Share your journey and breakthroughs to help others get succeed.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/login" className="w-full sm:w-auto px-8 py-3.5 text-base font-medium rounded-[10px] border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#111827] transition-colors">
                                Log In
                            </Link>
                            <Link to="/register" className="w-full sm:w-auto px-8 py-3.5 text-base font-medium rounded-[10px] text-white bg-[#4F46E5] dark:bg-[#6366F1] hover:opacity-90 transition-opacity">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // DASHBOARD UI (For Authenticated Users)
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F1F5F9] transition-colors duration-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search and Filter Section */}
                <div className="mb-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-xl group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 focus-within:text-[#6366F1] transition-colors" />
                            </div>
                            <input
                                id="dashboard-search-input"
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search projects by name, stack, or author..."
                                className="block w-full pl-12 pr-4 py-4 bg-[#FFFFFF] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-2xl text-[#0F172A] dark:text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                <Filter size={20} />
                            </div>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="block w-full md:w-48 py-2.5 px-4 bg-[#FFFFFF] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] text-[#0F172A] dark:text-[#F1F5F9] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6366F1] transition-all cursor-pointer"
                            >
                                <option value="All">All Projects</option>
                                <option value="Static">Static</option>
                                <option value="Dynamic">Dynamic</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <ProjectsSkeleton />
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-[#FFFFFF] dark:bg-[#111827] rounded-3xl border border-[#E2E8F0] dark:border-[#1F2937]">
                        <p className="text-[#475569] dark:text-[#94A3B8] text-xl font-medium">No projects found matching your search.</p>
                        <p className="text-sm text-[#475569] mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div key={project._id}>
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
