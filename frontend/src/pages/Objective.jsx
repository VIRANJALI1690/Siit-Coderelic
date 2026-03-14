import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, BookOpen, Users, Award, ArrowLeft } from 'lucide-react';

// The Objective page provides information about the Siit Coderelic project
const Objective = () => {
    const navigate = useNavigate(); // Hook to handle the "Back" functionality

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            
            {/* Main Content Wrapper */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                
                {/* 1. BACK TO DASHBOARD LINK */}
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Back to Dashboard</span>
                </button>

                {/* 2. MISSION SECTION (Your original data) */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Objective</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        To build a centralized repository where juniors can learn from seniors, professors can evaluate work,
                        and students can showcase their skills to the world.
                        Move beyond traditional evaluation methods and witness practical learning in action. Track student growth, identify emerging trends,
                        and guide future curriculum based on real-world project data.
                    </p>
                </div>

                {/* 3. FEATURES GRID (Your original data) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-t-4 border-indigo-500 shadow-sm">
                        <BookOpen className="w-12 h-12 text-indigo-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Knowledge Sharing</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Imagine having access to a treasure trove of real projects built by students,
                            complete with code, challenges, and solutions.
                            Learn from others and be inspired to build something extraordinary.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-t-4 border-purple-500 shadow-sm">
                        <Users className="w-12 h-12 text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Community Growth</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Your final year project is your opportunity to shape the next generation of coders.
                            Share your journey and breakthroughs to help others succeed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Objective;