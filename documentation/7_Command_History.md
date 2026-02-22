# 7. Command History

This document lists the essential terminal commands used during various stages of the project lifecycle.

## Project Setup & Installation

### 1. Initialize Frontend (React + Vite)
```powershell
# Navigate to project root
cd SiitCoderelic
# Create frontend with Vite
npm create vite@latest frontend -- --template react
```

### 2. Install Frontend Dependencies
```powershell
cd frontend
npm install
# Install specific libraries
npm install axios react-router-dom lucide-react framer-motion tailwindcss postcss autoprefixer
```

### 3. Initialize Backend
```powershell
cd ..
mkdir backend
cd backend
npm init -y
# Install backend dependencies
npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer cloudinary multer-storage-cloudinary
```

## Running the Project Locally

### 1. Start Backend Server
```powershell
cd backend
# Run with nodemon for auto-restart on changes
npx nodemon server.js
```
*Note: `nodemon` is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.*

### 2. Start Frontend Development Server
```powershell
cd frontend
npm run dev
```
*This command starts the Vite development server, usually accessible at `http://localhost:5173`.*

## Building the Project for Production

### 1. Compile Frontend
```powershell
cd frontend
npm run build
```
*This command creates a `dist` folder containing optimized HTML, CSS, and JS files ready for deployment.*

## Environment Setup
Before running the commands above, ensure the following environment variables are set in a `.env` file within the `backend` folder:
```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Command Explanations
- **`npm install`**: Downloads and installs all the software libraries listed in `package.json`.
- **`npm run dev`**: Executes the development script defined in the frontend package.
- **`npx nodemon`**: Runs the backend server and watches for changes.
- **`npm init -y`**: Creates a default `package.json` file for a new Node.js project.
- **`npm run build`**: Optimizes the code for the best performance in a production environment.
