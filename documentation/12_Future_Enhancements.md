# 12. Future Enhancements

While **Siit Coderelic** is a fully functional project showcase platform, there are several areas where it can be expanded and improved to become even more valuable for the developer community.

## 1. Limitations of the Current System
- **Single Image**: Currently, only one cover image can be uploaded per project.
- **No Social Features**: Users cannot comment on or "like" projects.
- **Manual Verification**: There is no automated check to verify if the provided GitHub link is valid.
- **Basic Search**: Search is limited to titles and descriptions, without advanced filtering by category or date.

## 2. Proposed Future Improvements

### Social Interaction
- **Comments & Feedback**: Allow users to leave constructive feedback on projects.
- **Likes/Stars**: Implement a "favoriting" system to highlight the most popular projects.
- **Follow System**: Allow users to follow their favorite developers to get notified of new uploads.

### Enhanced Media Support
- **Image Gallery**: Support for multiple screenshots and even video demos or YouTube embeds.
- **Markdown Support**: Allowing users to use Markdown for rich formatting in project descriptions.

### AI Integration Ideas
- **AI Summary Generator**: Use AI to automatically generate a professional summary based on the provided GitHub repository or detailed description.
- **Tech Stack Detector**: Automatically detect the technologies used in a project by analyzing the GitHub repo.
- **Project Recommendations**: Use a simple recommendation engine to suggest projects to users based on their interests.

## 3. Scalability Options
- **Microservices**: Moving from a monolith backend to microservices if the user base grows significantly.
- **Redis Caching**: Implementing Redis to cache frequently accessed project data and search results for faster load times.
- **S3 Storage**: Transitioning to AWS S3 for even more robust and cost-effective media storage at scale.

## 4. Security & Performance
- **Two-Factor Authentication (2FA)**: Adding an extra layer of security for user accounts.
- **Role-Based Access Control (RBAC)**: More granular permissions for different types of users (e.g., Moderators, Admins).
- **Service Workers**: Implementing PWA (Progressive Web App) features for offline access and project caching.

## 5. Conclusion on Roadmap
The roadmap for Siit Coderelic is focused on making it a more interactive and intelligent platform. By transitioning from a simple "Gallery" to a "Collaborative Hub", the platform can provide significantly more value to developers looking to grow their careers.
