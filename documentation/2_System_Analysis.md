# 2. System Analysis

## Existing System
Currently, most students and developers use a combination of different platforms to share their work:
- **Cloud Storage (Google Drive/Dropbox)**: Sharing ZIP files which are hard to preview.
- **Generic Social Media (LinkedIn/Twitter)**: Projects get lost in a feed and are not searchable by tech stack.
- **GitHub**: Highly technical and lacks a "gallery" or "portfolio" view for non-technical viewers.

## Problems in Existing System
- **Lack of Visual Representation**: Hard to see how the app looks without running it locally.
- **Poor Organization**: Projects are often scattered across folders or multiple repositories.
- **Searchability Issues**: Finding projects based on specific categories or features is difficult.
- **High Friction**: Viewers have to download and install dependencies to see the project in action.

## Proposed System
The proposed system, **Siit Coderelic**, addresses these gaps by providing:
- **Visual-First Gallery**: A beautiful grid view of project thumbnails and summaries.
- **Unified Profile**: All projects belonging to a user are grouped in one place.
- **Rich Metadata**: Each project includes tech stack, descriptions, and direct links.
- **Cloud-Based Storage**: Images are stored in the cloud for fast and reliable access.

## Benefits of the New System
- **Enhanced Visibility**: Projects are presented professionally.
- **Effortless Discovery**: Search and filter tools make it easy to find specific work.
- **Reduced Friction**: Quick previews and descriptions save time for recruiters.
- **Structured Documentation**: Encourages users to write better project summaries.

## Functional Requirements
1. **User Authentication**: Secure registration and login using JWT and Bcrypt.
2. **Project Management**: Users can create, update, and delete their project entries.
3. **Image Uploads**: Integration with Cloudinary for handling project screenshots.
4. **Search Functionality**: Search projects by title, description, or tags.
5. **Profile Management**: Users can update their personal information and bio.
6. **Detailed View**: A dedicated page for each project showing full details.

## Non-Functional Requirements
1. **Performance**: Fast page loads optimized by the Vite build tool.
2. **Scalability**: Backend designed to handle increasing numbers of users and projects.
3. **Security**: Password hashing and protected API routes.
4. **Responisveness**: Mobile-friendly design using Tailwind CSS.
5. **Usability**: Simple and intuitive UI/UX for a smooth user journey.
6. **Reliability**: Robust error handling on both frontend and backend.
