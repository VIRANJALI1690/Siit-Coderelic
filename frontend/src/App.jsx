import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Analytics } from "@vercel/analytics/react";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PublishProject from './pages/PublishProject';
import SearchPage from './pages/Search';
import Objective from './pages/Objective';
import AboutSIIT from './pages/AboutSIIT';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-200">
          
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/publish" element={<PublishProject />} />
              <Route path="/edit-project/:id" element={<PublishProject />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/objective" element={<Objective />} />
              <Route path="/about" element={<AboutSIIT />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
          </main>

          <Footer />

          {/* Vercel Analytics */}
          <Analytics />

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;