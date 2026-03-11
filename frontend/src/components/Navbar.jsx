import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Sun, Moon, Settings, User as UserIcon, Lock, ChevronDown } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

// The Navbar component is the navigation bar at the top of the screen
const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const dropdownRef = useRef(null);

    // We check if the user is logged in
    const isAuthenticated = !!user;

    // Handle clicking outside of dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // This function handles the logout process
    const handleLogout = () => {
        setIsSettingsOpen(false);
        if (logout) logout();
        navigate('/');
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-[#E2E8F0] dark:border-[#1F2937] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Left side: Logo & Name */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="w-9 h-9 rounded-lg bg-[#4F46E5] dark:bg-[#6366F1] flex items-center justify-center text-white font-bold text-2xl">
                                    S
                                </div>
                                <span className="text-2xl font-bold tracking-tighter text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#4F46E5] dark:group-hover:text-[#6366F1] transition-colors">
                                    SIIT CodeRelic
                                </span>
                            </Link>
                        </div>

                        {/* Right side: Actions */}
                        <div className="flex items-center gap-3 sm:gap-6">
                            {/* Theme Toggle Button (Always visible) */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                title="Toggle Theme"
                            >
                                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                            </button>

                            {isAuthenticated ? (
                                /* DASHBOARD NAVBAR (Logged In) */
                                <div className="flex items-center gap-2 sm:gap-8">
                                    {/* Text Buttons */}
                                    <Link to="/about" className="text-base font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-1">
                                        About
                                    </Link>
                                    <Link to="/publish" className="text-base font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-1">
                                        Publish
                                    </Link>

                                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1"></div>

                                    {/* Settings Dropdown */}
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                            className={`p-2.5 rounded-full transition-all flex items-center gap-1.5 ${isSettingsOpen ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-indigo-600'}`}
                                            title="Settings"
                                        >
                                            <Settings size={22} />
                                            <ChevronDown size={16} className={`transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isSettingsOpen && (
                                            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                {/* Top: User Info */}
                                                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
                                                        <img
                                                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff`}
                                                            alt="Profile"
                                                            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
                                                        />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="font-bold text-lg text-slate-900 dark:text-white truncate">{user?.name}</p>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                                    </div>
                                                </div>

                                                {/* Options */}
                                                <div className="p-2.5 space-y-1.5">
                                                    <Link
                                                        to="/profile"
                                                        onClick={() => setIsSettingsOpen(false)}
                                                        className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <UserIcon size={20} />
                                                        View Profile
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            setIsSettingsOpen(false);
                                                            setIsPasswordModalOpen(true);
                                                        }}
                                                        className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-colors text-left"
                                                    >
                                                        <Lock size={20} />
                                                        Change Password
                                                    </button>
                                                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1.5 mx-3"></div>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold text-left"
                                                    >
                                                        <LogOut size={20} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* LANDING PAGE NAVBAR (Not Logged In) */
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <Link to="/login" className="text-base font-medium text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F1F5F9] transition-colors">
                                        Log In
                                    </Link>
                                    <Link to="/register" className="px-6 py-2 text-base font-medium rounded-[10px] text-white bg-[#4F46E5] dark:bg-[#6366F1] hover:opacity-90 transition-opacity">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {/* Change Password Modal - Moved outside nav to ensure proper fixed positioning */}
            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </>
    );
};

export default Navbar;
