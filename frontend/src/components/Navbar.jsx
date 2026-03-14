import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, LogOut, Sun, Moon, User as UserIcon, Lock, ChevronDown, ArrowRight, Info } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dropdownRef = useRef(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/?search=${encodeURIComponent(searchValue.trim())}`);
        } else {
            navigate('/');
        }
    };

    const handleLogout = () => {
        setIsSettingsOpen(false);
        if (logout) logout();
        navigate('/');
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#1F2937] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Left Side: Logo & Search */}
                        <div className="flex items-center gap-6 flex-1">
                            <Link to="/" className="flex items-center gap-2 group shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-[#4F46E5] dark:bg-[#6366F1] flex items-center justify-center text-white font-bold text-xl">
                                    S
                                </div>
                                <span className="hidden md:block text-xl font-bold tracking-tighter text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#4F46E5] transition-colors">
                                    SIIT CodeRelic
                                </span>
                            </Link>

                            {isAuthenticated && (
                                <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    <input 
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500/50 dark:border-slate-700 rounded-xl py-2 pl-10 pr-12 text-sm outline-none transition-all dark:text-white"
                                    />
                                    <button 
                                        type="submit"
                                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                                    >
                                        <ArrowRight size={14} strokeWidth={3} />
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Right Side: Navigation & Profile */}
                        <div className="flex items-center gap-2 ml-6">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    {/* --- NAVIGATION LINKS --- */}
                                    <div className="hidden lg:flex items-center gap-6 px-4">
                                        <Link to="/publish" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                                            Publish Project
                                        </Link>
                                        <Link to="/objective" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                                            Our Objective
                                        </Link>
                                        {/* Added AboutSIIT back here */}
                                        <Link to="/about" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                                            About SIIT
                                        </Link>
                                    </div>

                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                            className="flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                                        >
                                            <img
                                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff`}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                                            />
                                            <ChevronDown size={14} className={`text-slate-500 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isSettingsOpen && (
                                            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                                                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{user?.name}</p>
                                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                                </div>
                                                <div className="p-1">
                                                    <Link to="/profile" onClick={() => setIsSettingsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600">
                                                        <UserIcon size={18} /> View Profile
                                                    </Link>
                                                    <button onClick={() => { setIsSettingsOpen(false); setIsPasswordModalOpen(true); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600">
                                                        <Lock size={18} /> Change Password
                                                    </button>
                                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold">
                                                        <LogOut size={18} /> Logout Account
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600">Log In</Link>
                                    <Link to="/register" className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-[#4F46E5] hover:bg-indigo-700 transition-colors">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
        </>
    );
};

export default Navbar;