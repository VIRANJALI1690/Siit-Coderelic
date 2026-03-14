import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../context/AuthContext";
import { Filter } from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const { search } = useLocation();

  // Extract search term from URL
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get("search") || "";

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const { data } = await api.get("/projects");
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  useEffect(() => {
    let result = projects;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(lowerTerm) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(lowerTerm),
          ) ||
          (project.user && project.user.name.toLowerCase().includes(lowerTerm)),
      );
    }

    if (filterType !== "All") {
      result = result.filter((project) => project.projectType === filterType);
    }

    setFilteredProjects(result);
  }, [searchTerm, filterType, projects]);

  if (!user) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B1120] px-4">
        <div className="max-w-[650px] text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            The <span className="text-indigo-600">Platform</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#475569] dark:text-[#94A3B8] font-medium leading-[1.6]">
            Where Seniors Build. Juniors Get Inspired.
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Your final year project is your opportunity to shape the next
            generation of coders. Share your journey and breakthroughs to help
            others succeed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-800 transition-colors focus:outline-none"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Refined Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {searchTerm
                ? `Results for "${searchTerm}"`
                : "Community Projects"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore and learn from the SIIT developer community.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
              <Filter size={18} />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="All">All Types</option>
              <option value="Static">Static</option>
              <option value="Dynamic">Dynamic</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 text-lg">
              No projects found. Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
