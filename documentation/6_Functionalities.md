# 6. Functionalities

## List of Features
1. **User Authentication**: Secure Sign-up and Sign-in functionality.
2. **Dynamic Dashboard**: A personalized profile page for users to view and manage their projects.
3. **Project Publishing**: Multi-field form for uploading project title, description, images, and links.
4. **Interactive Search**: Real-time filtering of projects based on user input.
5. **Detailed Project View**: A dedicated page for in-depth information about a specific project.
6. **Responsive Design**: Optimized for Desktop, Tablet, and Mobile screens.
7. **Social Links**: Users can link their GitHub, LinkedIn, and personal website to their profile.

## Detailed Explanation of Each Feature

### 1. User Authentication
Users can create a new account by providing their name, email, and a secure password. Once registered, they can log in to access protected features like publishing projects. The authentication state is maintained globally across the app.

### 2. Project Publishing System
This is the core feature where users can fill out a form to showcase their work.
- **Fields**: Title, Short Summary, Long Description, Tech Stack (Tags), Demo Link, GitHub Link.
- **Image Handling**: Users can upload a cover image which is instantly processed and hosted on Cloudinary.

### 3. Search & Exploration
The search page allows any visitor to find projects. As the user types, the application hits a search API that queries the MongoDB database for matching titles or descriptions.

### 4. Personal Portfolio (Profile)
The profile page acts as a mini-portfolio for the user. It displays their bio, their profile picture, and a grid of all projects they have ever uploaded.

## User Roles & Permissions
- **Guest (Unauthenticated User)**:
    - Can browse and search all projects.
    - Can view project details.
    - Cannot publish or edit projects.
- **Registered User (Authenticated)**:
    - Has all Guest permissions.
    - Can create and publish new project entries.
    - Can edit or delete their own projects.
    - Can manage their personal profile.

## User Workflow (Start to End)
1. **Discovery**: User enters the site and browses the Home page.
2. **Onboarding**: User navigates to the Register page and creates an account.
3. **Authentication**: User logs in and is redirected to their Dashboard.
4. **Action**: User clicks on "Publish Project" and fills out the technical details and uploads an image.
5. **Verification**: The project appears on the user's profile and the main search gallery.
6. **Sharing**: User copies their profile URL to share with others.
