import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

// We import all the different pages for our application
import Home from './pages/Home';
import Profile from './pages/Profile';
import PublishProject from './pages/PublishProject';
import SearchPage from './pages/Search';
import About from './pages/About';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  // This state tells us if we are in "Dark Mode" or "Light Mode"
  // It checks the browser's storage to remember the user's preference
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // This effect runs whenever "darkMode" changes
  // It adds or removes the 'dark' class from the website to change the colors
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // This function switches between Dark and Light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // AuthProvider lets the whole app know who is logged in
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          {/* The Navbar stays at the top of every page */}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Routes define which page to show based on the URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/publish" element={<PublishProject />} />
            <Route path="/edit-project/:id" element={<PublishProject />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
