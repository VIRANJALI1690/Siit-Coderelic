import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { X, Plus, Github, Globe, Image as ImageIcon, Video, ArrowLeft, Info } from "lucide-react";

const PublishProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const thumbRef = useRef(null);
  const videoRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "",
    githubLink: "",
    liveLink: "",
    techInput: "",
    technologies: [],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState("");

  const { title, description, projectType, githubLink, liveLink, techInput, technologies } = formData;

  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const { data } = await api.get(`/projects/${id}`);
          setFormData({
            ...data,
            techInput: "",
            githubLink: data.githubLink || "",
            liveLink: data.liveLink || "",
            technologies: data.technologies || [],
          });
          setThumbnailPreview(data.thumbnail);
          setVideoPreview(data.demoVideo);
          setFetching(false);
        } catch (err) {
          setError("Could not load project.");
          setFetching(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...technologies, techInput.trim()],
        techInput: "",
      });
    }
  };

  const removeTech = (tech) => setFormData({ ...formData, technologies: technologies.filter(t => t !== tech) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (!['technologies', 'thumbnailFile', 'demoVideoFile', 'techInput', 'thumbnail', 'demoVideo'].includes(key)) {
        data.append(key, formData[key]);
      }
    });
    technologies.forEach(t => data.append("technologies", t));
    if (formData.thumbnailFile) data.append("thumbnail", formData.thumbnailFile);
    if (formData.demoVideoFile) data.append("demoVideo", formData.demoVideoFile);

    try {
      isEditMode ? await api.put(`/projects/${id}`, data) : await api.post("/projects", data);
      navigate("/");
    } catch (err) {
      setError("Failed to save project.");
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B1120]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  const labelClass = "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2";
  const inputClass = "w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-300">
      {/* Reduced py-12 to py-6 to close the gap from the navbar */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Tightened Header: reduced mb-10 to mb-6 and text size from 4xl to 3xl */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isEditMode ? "Edit your project" : "Publish a project"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-base">
            Share your project with the SIIT Coderelic.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-3">
             <Info size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white dark:bg-[#111827] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center text-xs">1</span>
              Basic Details
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={labelClass}>Project Title <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={title} onChange={handleChange} required className={inputClass} placeholder="e.g. Smart Attendance System" />
              </div>

              <div>
                <label className={labelClass}>Detailed Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={description} onChange={handleChange} required rows="4" className={inputClass} placeholder="Tell us about the problem you solved..." />
              </div>

              <div>
                <label className={labelClass}>Project Environment</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Static', 'Dynamic'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, projectType: type})}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all ${projectType === type 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500'}`}
                    >
                      {type === 'Static' ? 'Frontend Only' : 'Full Stack / Dynamic'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Links & Stack */}
          <div className="bg-white dark:bg-[#111827] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center text-xs">2</span>
              Links & Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>GitHub Repository</label>
                <div className="relative">
                  <Github size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="url" name="githubLink" value={githubLink} onChange={handleChange} className={`${inputClass} pl-12`} placeholder="https://github.com/..." />
                </div>
              </div>
              <div>
                <label className={labelClass}>Live Preview</label>
                <div className="relative">
                  <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="url" name="liveLink" value={liveLink} onChange={handleChange} className={`${inputClass} pl-12`} placeholder="https://..." />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Technology Stack</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="techInput" 
                  value={techInput} 
                  onChange={handleChange} 
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className={inputClass} 
                  placeholder="Press Enter to add" 
                />
                <button type="button" onClick={addTechnology} className="px-6 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-200">Add</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {technologies.map(tech => (
                  <span key={tech} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {tech}
                    <X size={14} className="cursor-pointer" onClick={() => removeTech(tech)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="bg-white dark:bg-[#111827] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center text-xs">3</span>
              Project Media
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className={labelClass}>Thumbnail Image</label>
                <div 
                  onClick={() => thumbRef.current.click()}
                  className="group relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all overflow-hidden"
                >
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon size={24} className="mx-auto text-slate-400 group-hover:text-indigo-500" />
                      <p className="mt-2 text-xs font-bold text-slate-500">Upload Cover</p>
                    </div>
                  )}
                </div>
                <input type="file" ref={thumbRef} hidden accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) { setFormData({...formData, thumbnailFile: file}); setThumbnailPreview(URL.createObjectURL(file)); }
                }} />
              </div>

              <div className="space-y-3">
                <label className={labelClass}>Demo Video</label>
                <div 
                  onClick={() => videoRef.current.click()}
                  className="group relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all overflow-hidden"
                >
                  {videoPreview ? (
                    <video src={videoPreview} className="w-full h-full object-cover" controls />
                  ) : (
                    <div className="text-center">
                      <Video size={24} className="mx-auto text-slate-400 group-hover:text-indigo-500" />
                      <p className="mt-2 text-xs font-bold text-slate-500">Upload Video</p>
                    </div>
                  )}
                </div>
                <input type="file" ref={videoRef} hidden accept="video/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) { setFormData({...formData, demoVideoFile: file}); setVideoPreview(URL.createObjectURL(file)); }
                }} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Discard</button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
            >
              {loading ? "Publishing..." : isEditMode ? "Update Project" : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishProject;