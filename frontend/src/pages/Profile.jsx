import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { Edit, Github, Linkedin, Briefcase, Mail, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// The Profile page shows the user's information and the projects they have uploaded
const Profile = () => {
    // We get the current user from our AuthContext
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // This state stores the values when the user is editing their profile info
    const [editForm, setEditForm] = useState({
        name: '',
        jobRole: '',
        linkedin: '',
        github: '',
        bio: '',
        avatar: ''
    });

    // When the user data is available, we pre-fill the edit form
    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || '',
                jobRole: user.jobRole || '',
                linkedin: user.linkedin || '',
                github: user.github || '',
                bio: user.bio || '',
                avatar: user.avatar || ''
            });
            fetchMyProjects();
        }
    }, [user]);

    // This function fetches only the projects that belong to the logged-in user
    const fetchMyProjects = async () => {
        try {
            const { data } = await api.get('/projects/myprojects');
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch projects');
            setLoading(false);
        }
    };

    // This function allows a user to delete their own project
    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                // Call the API to delete from the database
                await api.delete(`/projects/${id}`);
                // Remove it from the local state list so it disappears instantly
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                alert('Failed to delete project');
            }
        }
    };

    // This function handles updating the user's profile details
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        // Use FormData for profile updates (because of the avatar image upload)
        const formData = new FormData();
        formData.append('name', editForm.name);
        formData.append('jobRole', editForm.jobRole);
        formData.append('linkedin', editForm.linkedin);
        formData.append('github', editForm.github);
        formData.append('bio', editForm.bio);
        if (editForm.avatarFile) {
            formData.append('avatar', editForm.avatarFile);
        }

        try {
            const { data } = await api.put('/users/profile', formData);
            // Update the locally stored user info with the new details
            localStorage.setItem('userInfo', JSON.stringify({ ...user, ...data }));
            // Refresh to update the whole app with the new info
            window.location.reload();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert('Failed to update profile: ' + (error.response?.data?.message || error.message));
        }
    };

    if (!user) return <div className="text-center mt-20 text-slate-900 dark:text-white">Please login to view profile</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Sidebar: Displays User Profile Details */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="md:col-span-1"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col items-center text-center">
                            {/* Profile Image with Edit Button */}
                            <div className="relative mb-4">
                                <img
                                    src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.username}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                                />
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-all hover:scale-110 shadow-lg"
                                >
                                    <Edit size={16} />
                                </button>
                            </div>

                            {/* Show the Edit Form if 'isEditing' is true, otherwise show profile info */}
                            {isEditing ? (
                                <form onSubmit={handleUpdateProfile} className="w-full space-y-3">
                                    <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Full Name" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                                    <input value={editForm.jobRole} onChange={e => setEditForm({ ...editForm, jobRole: e.target.value })} placeholder="Job Role (e.g. Student)" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                                    <input value={editForm.bio} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} placeholder="Bio" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                                    <input value={editForm.linkedin} onChange={e => setEditForm({ ...editForm, linkedin: e.target.value })} placeholder="LinkedIn URL" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                                    <input value={editForm.github} onChange={e => setEditForm({ ...editForm, github: e.target.value })} placeholder="GitHub URL" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                                    <div className="text-left">
                                        <label className="text-xs text-gray-500 mb-1 block">Profile Picture</label>
                                        <input type="file" accept="image/*" onChange={e => setEditForm({ ...editForm, avatarFile: e.target.files[0] })} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white text-sm" />
                                    </div>
                                    <div className="flex space-x-2 justify-center pt-2">
                                        <button type="submit" className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition-all font-medium">Save</button>
                                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-1.5 rounded hover:bg-gray-600 transition-all font-medium">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{user.role}</p>
                                    {user.jobRole && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center justify-center"><Briefcase size={14} className="mr-1" /> {user.jobRole}</p>}
                                    <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">{user.bio || "No bio added yet."}</p>

                                    {/* Social media links */}
                                    <div className="flex space-x-4 mt-6">
                                        {user.github && (
                                            <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"><Github size={24} /></a>
                                        )}
                                        {user.linkedin && (
                                            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"><Linkedin size={24} /></a>
                                        )}
                                        <a href={`mailto:${user.email}`} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"><Mail size={24} /></a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Right Area: Displays the grid of user's uploaded projects */}
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-6 dark:text-white border-b pb-2 dark:border-gray-700">My Projects</h3>

                    {loading ? (
                        <p className="dark:text-white">Loading projects...</p>
                    ) : projects.length === 0 ? (
                        <p className="dark:text-gray-400 text-center py-10">You haven't published any projects yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <div key={project._id} className="relative group">
                                    {/* The ProjectCard shows the project's visual preview */}
                                    <ProjectCard project={project} />
                                    {/* Admin icons (Edit/Delete) overlay on hover */}
                                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                                        <Link
                                            to={`/edit-project/${project._id}`}
                                            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-all"
                                            title="Edit Project"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProject(project._id)}
                                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-all"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
