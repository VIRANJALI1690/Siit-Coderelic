const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// This line loads our environment variables from the .env file
// Things like the database URL and Secret keys are kept here
dotenv.config();

// This function connects our backend to the MongoDB database
connectDB();

// We initialize our Express application here
const app = express();

// Middleware section
// These lines allow the server to understand JSON data and long forms
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// This allows other websites (like our frontend) to talk to this API
app.use(cors());

// This small block logs every request to the console so we can see what's happening
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Routes section
// This is the default route to check if the API is working
app.get('/', (req, res) => {
    res.send('Siit Coderelic API is running...');
});

// These are our different API endpoints
// Auth for Login/Register, Users for profile data, Projects for project posts
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// This middleware handles any errors that happen in our routes
app.use(require('./middleware/errorMiddleware').errorHandler);

// We define which port the server will run on
const PORT = process.env.PORT || 5000;

// This starts the server and makes it listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
