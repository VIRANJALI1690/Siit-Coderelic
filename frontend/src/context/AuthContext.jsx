import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

// The AuthProvider component wraps our entire app and provides auth information to every page
export const AuthProvider = ({ children }) => {
    // 'user' stores the currently logged-in user's data
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This effect runs when the app starts
    // It checks if 'userInfo' exists in the browser's storage (LocalStorage)
    // This allows the user to stay logged in even if they refresh the page
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    // Function to handle logging in
    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    // Function to handle new user registration
    const register = async (name, email, password, username) => {
        // We send the user data to our backend API
        const { data } = await api.post('/auth/register', { name, email, password, username });
        
        // If successful, the backend returns the user data and a token
        // We store this in state and local storage
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    // Function to handle logging out
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
