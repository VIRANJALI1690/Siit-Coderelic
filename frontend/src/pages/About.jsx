import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Award } from 'lucide-react';

// The About page provides information about the Siit Coderelic project
const About = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Hero Section: A colorful banner with the project title */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    {/* Animated heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold mb-4"
                    >
                        About Siit Coderelic
                    </motion.h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                        A Final Year Project dedicated to showcasing excellence in student development.
                    </p>
                </div>
            </div>

            {/* Mission Section: Explains why this project was built */}
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        To build a centralized repository where juniors can learn from seniors, professors can evaluate work,
                        and students can showcase their skills to the world.
                        Move beyond traditional evaluation methods and witness practical learning in action. Track student growth, identify emerging trends,
                        and guide future curriculum based on real-world project data.
                    </p>
                </div>

                {/* Features/Goals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-indigo-500 transition-all hover:scale-[1.02]">
                        <BookOpen className="w-12 h-12 text-indigo-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Knowledge Sharing</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Imagine having access to a treasure trove of real projects built by students,
                            complete with code, challenges, and solutions.
                            Learn from others and be inspired to build something extraordinary.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-purple-500 transition-all hover:scale-[1.02]">
                        <Users className="w-12 h-12 text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Community Growth</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Your final year project is your opportunity to shape the next generation of coders.
                            Share your journey and breakthroughs to help others succeed.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Note with copyright and developer names */}
            <div className="bg-gray-100 dark:bg-gray-800 py-8 text-center border-t dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                    © 2026 siit coderelic | Final Year Project Platform Designed & Developed by Viranjali & Pratiksha
                </p>
            </div>
        </div>
    );
};

export default About;
