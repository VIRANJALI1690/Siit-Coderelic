import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import { 
    Edit, 
    Github, 
    Linkedin, 
    Briefcase, 
    Mail, 
    Trash2, 
    Layout, 
    User as UserIcon, 
    Camera, 
    X,
    ArrowLeft
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('projects');

    const [editForm, setEditForm] = useState({
        name: '', jobRole: '', linkedin: '', github: '', bio: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('tab')) setActiveTab(params.get('tab'));
    }, [location]);

    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || '', 
                jobRole: user.jobRole || '',
                linkedin: user.linkedin || '', 
                github: user.github || '',
                bio: user.bio || ''
            });
            fetchMyProjects();
        }
    }, [user]);

    const fetchMyProjects = async () => {
        try {
            const { data } = await api.get('/projects/myprojects');
            setProjects(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Delete this project forever?')) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                alert('Failed to delete project');
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(editForm).forEach(key => formData.append(key, editForm[key]));
        if (avatarFile) formData.append('avatar', avatarFile);

        try {
            const { data } = await api.put('/users/profile', formData);
            localStorage.setItem('userInfo', JSON.stringify({ ...user, ...data }));
            window.location.reload();
        } catch (error) {
            alert('Update failed');
        }
    };

    if (!user) return <div className="text-center mt-20 dark:text-white font-bold">Please login to view profile</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0B1120] transition-colors pb-10">
            
            {/* --- TOP NAV --- */}
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 dark:text-slate-400 transition-colors text-sm font-bold"
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
            </div>

            {/* --- HEADER SECTION --- */}
            <div className="max-w-4xl mx-auto px-4 py-10 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20">
                    
                    {/* DP with Instagram Overlay */}
                    <div 
                        className="relative shrink-0 group cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        <img
                            src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800 p-1"
                            alt="Profile"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                            <Camera className="text-white" size={24} />
                            <span className="text-[10px] text-white font-bold uppercase mt-1">Change Photo</span>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-5 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <h2 className="text-2xl font-light dark:text-white">{user.name}</h2>
                            <button onClick={() => setIsEditing(true)} className="px-6 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-bold dark:text-white transition-all">
                                Edit Profile
                            </button>
                            {/* Settings Icon Removed as requested */}
                        </div>

                        <div className="flex justify-center md:justify-start gap-8 text-sm md:text-base">
                            <span className="dark:text-white"><b>{projects.length}</b> projects</span>
                            <span className="dark:text-white"><b>Verified</b> Student</span>
                        </div>

                        <div className="space-y-1">
                            <p className="font-bold dark:text-white">{user.jobRole || "SIIT Student"}</p>
                            <p className="text-sm dark:text-slate-300 max-w-md">{user.bio || "Digital relic builder at SIIT."}</p>
                            
                            <div className="flex justify-center md:justify-start gap-4 pt-3 text-slate-500 dark:text-slate-400">
                                {user.github && <a href={user.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600"><Github size={20} /></a>}
                                {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-600"><Linkedin size={20} /></a>}
                                <a href={`mailto:${user.email}`} className="hover:text-indigo-600"><Mail size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TABS --- */}
            <div className="flex justify-center">
                <div className="flex gap-12">
                    <button 
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 py-4 text-xs font-bold uppercase tracking-widest border-t transition-all ${activeTab === 'projects' ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' : 'border-transparent text-slate-400'}`}
                    >
                        <Layout size={14} /> Projects
                    </button>
                    <button 
                        onClick={() => setActiveTab('about')}
                        className={`flex items-center gap-2 py-4 text-xs font-bold uppercase tracking-widest border-t transition-all ${activeTab === 'about' ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' : 'border-transparent text-slate-400'}`}
                    >
                        <UserIcon size={14} /> About
                    </button>
                </div>
            </div>

            {/* --- CONTENT --- */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {activeTab === 'projects' ? (
                    loading ? (
                        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div key={project._id} className="relative group rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                    <ProjectCard project={project} />
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <Link to={`/edit-project/${project._id}`} className="p-2 bg-white/90 dark:bg-slate-900/90 text-indigo-600 rounded-lg shadow-xl"><Edit size={16} /></Link>
                                        <button onClick={() => handleDeleteProject(project._id)} className="p-2 bg-white/90 dark:bg-slate-900/90 text-red-600 rounded-lg shadow-xl"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="max-w-2xl mx-auto bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl text-center">
                         <Briefcase className="mx-auto mb-4 text-indigo-500" size={32} />
                         <h3 className="text-xl font-bold dark:text-white mb-2">Academic Profile</h3>
                         <p className="text-slate-500 dark:text-slate-400">Verified SIIT Student account. Focused on building high-quality technical projects.</p>
                    </div>
                )}
            </div>

            {/* --- EDIT MODAL --- */}
            {isEditing && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold dark:text-white">Edit Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
                        </div>
                        
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            {/* Hidden File Input */}
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500">
                                    <img src={previewUrl || user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-full h-full object-cover" />
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" hidden />
                                <button type="button" onClick={() => fileInputRef.current.click()} className="text-xs font-bold text-indigo-500">Change Profile Photo</button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                                    <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Job Role</label>
                                    <input value={editForm.jobRole} onChange={e => setEditForm({...editForm, jobRole: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm dark:text-white" placeholder="Student / Developer" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Bio</label>
                                    <textarea value={editForm.bio} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm dark:text-white min-h-[80px]" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">GitHub URL</label>
                                    <input value={editForm.github} onChange={e => setEditForm({...editForm, github: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm dark:text-white" placeholder="https://github.com/..." />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">LinkedIn URL</label>
                                    <input value={editForm.linkedin} onChange={e => setEditForm({...editForm, linkedin: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm dark:text-white" placeholder="https://linkedin.com/in/..." />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700">Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold text-sm">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;