import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    const location = useLocation();
    const { user } = useAuth();
    
    const isLandingPage = !user && location.pathname === '/';
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isLandingPage || isAuthPage) {
        return null;
    }

    return (
        <footer className="bg-[#F8FAFC] dark:bg-[#0B1120] py-8 text-center border-t border-[#E2E8F0] dark:border-[#1F2937] transition-colors duration-300 mt-auto">
            <p className="text-[#475569] dark:text-[#94A3B8]">
                © 2026 siit coderelic | Platform Designed & Developed by Viranjali & Pratiksha under guidance of Prof. Honrao and Prof. Sunny Waghmode
            </p>
        </footer>
    );
};

export default Footer;
