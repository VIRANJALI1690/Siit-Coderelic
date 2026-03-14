import React from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { School, BookOpen, Target, Link2, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

const AboutSIIT = () => {
    const navigate = useNavigate(); // Initialize navigation

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Main Container */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                
                {/* Back to Dashboard Button */}
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Back to Dashboard</span>
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        About SIIT Institute
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        <strong>Shriram Institute of Information and Technology, Paniv</strong> is a
                        well-known educational institute operating under
                        <strong> Shriram Shikshan Sanstha, Paniv</strong>.
                        The institute is affiliated with
                        <strong> Punyashlok Ahilyadevi Holkar Solapur University, Solapur</strong>.

                        <br /><br />

                        SIIT focuses on providing quality education in the field of
                        <strong> Computer Science and Information Technology</strong>.
                        The institution aims to develop strong technical knowledge,
                        analytical thinking, problem-solving ability, and practical
                        development skills among students.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Courses */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-t-4 border-indigo-500">
                        <BookOpen className="w-10 h-10 text-indigo-500 mb-3" />

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Courses Offered
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            The Department of Computer Science provides academic programs
                            designed to build strong programming and development skills.
                        </p>

                        <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                            <li>• B.Sc. in Computer Science (B.Sc. ECS)</li>
                            <li>• BCA – Bachelor of Computer Applications</li>
                            <li>• M.Sc. in Computer Science</li>
                        </ul>
                    </div>

                    {/* Project Purpose */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-t-4 border-purple-500">
                        <Target className="w-10 h-10 text-purple-500 mb-3" />

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Purpose of the Coderelic Project
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            <strong>Coderelic</strong> is developed by final-year students
                            to create a centralized platform where students can publish
                            and showcase their academic projects.
                        </p>

                        <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                            <li>• Share completed projects</li>
                            <li>• Explore projects created by other students</li>
                            <li>• Get inspiration for new ideas</li>
                            <li>• Learn real project implementation</li>
                            <li>• Improve development & presentation skills</li>
                        </ul>
                    </div>

                    {/* Learning Advantage */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-t-4 border-green-500">
                        <School className="w-10 h-10 text-green-500 mb-3" />

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Learning Advantage
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            By exploring projects shared on the platform, new students can
                            understand how real academic projects are designed, developed,
                            and presented. This encourages practical learning and promotes
                            innovation within the student community.
                        </p>
                    </div>

                    {/* Official Links */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-t-4 border-orange-500">
                        <Link2 className="w-10 h-10 text-orange-500 mb-3" />

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Official Links
                        </h2>

                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">

                            <li>
                                College Website:
                                <a
                                    href="https://siitpaniv.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-500 hover:underline ml-1"
                                >
                                    siitpaniv.org
                                </a>
                            </li>

                            <li>
                                Instagram:
                                <a
                                    href="https://www.instagram.com/siit_paniv_college"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-500 hover:underline ml-1"
                                >
                                    @siit_paniv_college
                                </a>
                            </li>

                            <li>
                                Facebook:
                                <a
                                    href="https://www.facebook.com/groups/249221052812445"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-500 hover:underline ml-1"
                                >
                                    SIIT Paniv Community
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSIIT;