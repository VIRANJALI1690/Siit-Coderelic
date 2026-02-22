import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Sun, Moon, PlusSquare, Search, Home, Info } from 'lucide-react';

// The Navbar component is the navigation bar at the top of the screen
const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // We check if the user is logged in by looking for a token
    const isAuthenticated = !!user || !!localStorage.getItem("token");

    // This function handles the logout process
    const handleLogout = () => {
        // Remove user data from storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (logout) logout();
        // Send user back to the login page
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Left side: The Logo/Name of the site */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                Siit Coderelic
                            </span>
                        </Link>
                    </div>

                    {/* Center: Search Bar (Hidden on small mobile screens) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="block w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-full text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
                                onFocus={() => navigate('/search')}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-xs text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">⌘K</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Actions like Dark Mode toggle and Profile */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Dark Mode Toggle Button */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            title="Toggle Theme"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* If logged in, show these icons */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Link to="/" className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" title="Home">
                                    <Home size={20} />
                                </Link>
                                <Link to="/about" className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hidden sm:block" title="About">
                                    <Info size={20} />
                                </Link>
                                <Link to="/publish" className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" title="Create Project">
                                    <PlusSquare size={20} />
                                </Link>

                                <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>

                                {/* Profile Link with User Avatar */}
                                <Link to="/profile" className="flex items-center gap-2 group" title="Profile">
                                    <div className="relative">
                                        <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500 group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                                            <img
                                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff`}
                                                alt="Profile"
                                                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
                                            />
                                        </div>
                                    </div>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-red-600 transition-colors ml-1"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            // If not logged in, show Log In and Sign Up buttons
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Log In
                                </Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all hover:scale-105">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
