# 4. Implementation Details

## Folder Structure Explanation
The project is structured into two main directories: `frontend` and `backend`.

### Root Structure
- `/backend`: Contains the Node.js/Express server and MongoDB models.
- `/frontend`: Contains the React/Vite application.
- `/documentation`: Project documentation files.

### Backend Structure Breakdown
- `/models`: Defines the blueprints for data (Project.js, User.js).
- `/routes`: Defines the API endpoints (authRoutes.js, projectRoutes.js, userRoutes.js).
- `/controllers`: Contains the logic for each API route.
- `/middleware`: Custom functions like `authMiddleware.js` for protecting routes.
- `/config`: Database connection configuration (`db.js`).
- `server.js`: The main entry point for the backend server.

### Frontend Structure Breakdown
- `/src/pages`: Individual pages of the application (Home, Login, Profile, etc.).
- `/src/components`: Reusable UI elements like the Navbar or Project Cards.
- `/src/context`: React Context for global state management (User information).
- `/src/utils`: Helper functions and API configuration.
- `App.jsx`: Main routing and layout wrapper.
- `main.jsx`: Renders the app into the DOM.

## Explanation of Major Files
1. **backend/server.js**: Sets up Express, connects to MongoDB, and registers all API routes.
2. **frontend/src/App.jsx**: Defines the routes for the application using `react-router-dom`.
3. **backend/models/Project.js**: The schema defining what a project contains (Title, Description, Image URL, Tech Stack, Owner).
4. **frontend/src/pages/PublishProject.jsx**: A complex form that handles file uploads and project submission.

## How Frontend Connects to Backend
The connection is established using the **Axios** library. 
- The backend runs on a specific port (e.g., `http://localhost:5000`).
- The frontend makes requests to this URL (e.g., `axios.post('http://localhost:5000/api/projects', data)`).
- Environment variables are used to store the API Base URL for easy switching between local and production environments.

## How Database is Connected
The project uses **Mongoose** to connect to **MongoDB Atlas** (cloud database).
- A connection string (URI) is stored in the `.env` file of the backend.
- The `config/db.js` file handles the connection logic and logs success or failure to the console.

## Step-by-Step Flow of Execution
1. **User Request**: User fills the "Publish Project" form on the React frontend.
2. **Frontend Validation**: The app checks if all required fields are filled.
3. **API Call**: `PublishProject.jsx` sends a POST request with the form data.
4. **Backend Reception**: `server.js` routes the request to `projectRoutes.js`, then to the controller.
5. **Auth Check**: `authMiddleware` verifies the user's JWT token.
6. **Processing**: The controller saves the data to MongoDB.
7. **Confirmation**: A success message is sent back to the frontend.
8. **UI Update**: The frontend redirects the user to their gallery or shows a success toast.
