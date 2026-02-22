import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import { Search as SearchIcon, Filter } from 'lucide-react';

// The Search page allows users to find projects by title, tech stack, or author
const SearchPage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [loading, setLoading] = useState(true);

    // Fetch all projects when the search page opens
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
                setFilteredProjects(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch projects");
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // This "useEffect" runs whenever the user types in the search box or changes the filter dropdown
    useEffect(() => {
        let result = projects;

        // Filter by Search Term: This checks if the text is in the Title, Technologies, or Student Name
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(project =>
                project.title.toLowerCase().includes(lowerTerm) ||
                project.technologies.some(tech => tech.toLowerCase().includes(lowerTerm)) ||
                (project.user && project.user.name.toLowerCase().includes(lowerTerm))
            );
        }

        // Filter by Project Type: Checks if the project is "Static" or "Dynamic"
        if (filterType !== 'All') {
            result = result.filter(project => project.projectType === filterType);
        }

        setFilteredProjects(result);
    }, [searchTerm, filterType, projects]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Search and Filter Control Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                {/* Search Input Box */}
                <div className="relative w-full md:w-1/2">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5 text-slate-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by project, technology, or student..."
                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown Filter for Static/Dynamic project types */}
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <Filter className="text-slate-500" size={20} />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="block w-full py-2 px-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 sm:text-sm dark:text-white transition-all"
                    >
                        <option value="All">All Types</option>
                        <option value="Static">Static</option>
                        <option value="Dynamic">Dynamic</option>
                    </select>
                </div>
            </div>

            {/* Results Grid: Shows projects that match the search/filter */}
            {loading ? (
                <p className="text-center text-slate-500 py-20">Loading projects...</p>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-xl font-medium text-slate-400">No projects found matching your criteria.</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
