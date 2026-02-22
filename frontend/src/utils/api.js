import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (userInfo && userInfo.token) {
            console.log("Frontend API sending token:", userInfo.token ? userInfo.token.substring(0, 15) + "..." : "null");
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
