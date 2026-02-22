# 10. Deployment Guide

Deploying means making your website accessible to everyone on the internet. Since this is a MERN stack app, we usually deploy the Frontend and Backend separately.

## 1. Deploying Frontend (Vercel or Netlify)
Vercel and Netlify are excellent for React apps.

### Using Vercel (Recommended):
1. **Prepare**: Ensure your code is on GitHub.
2. **Login**: Go to [Vercel.com](https://vercel.com) and link your GitHub account.
3. **Import**: Click "Add New" -> "Project" and select your `SiitCoderelic` repository.
4. **Configure**:
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
5. **Environment Variables**: Add `VITE_API_URL` (the link to your deployed backend).
6. **Deploy**: Click "Deploy". Vercel will give you a live URL like `siit-coderelic.vercel.app`.

## 2. Deploying Backend (Render or Railway)
Backend services need a platform that supports Node.js and a running process.

### Using Render:
1. **New Web Service**: Connect your GitHub repo on [Render.com](https://render.com).
2. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. **Env Vars**: Crucial! Add all variables from your `.env` file (`MONGO_URI`, `JWT_SECRET`, etc.).
4. **Deploy**: Click "Create Web Service". Render will provide a backend URL like `siit-backend.onrender.com`.

## 3. Environment Variable Setup
When deploying, you MUST set the environment variables in the hosting platform's dashboard.
- **Frontend**: Needs the backend's URL to know where to send requests.
- **Backend**: Needs the database connection string and Cloudinary keys.

## 4. Troubleshooting Common Issues

### Issue: "CORS Error"
- **Cause**: The backend is blocking requests from the frontend's new URL.
- **Fix**: Update the `cors()` config in `server.js` to include your Vercel URL.

### Issue: "Blank Page after build"
- **Cause**: Typically a routing problem or missing environment variable.
- **Fix**: Check the browser console (F12) for error messages and ensure all API URLs are correct.

### Issue: "Database Connection Timeout"
- **Cause**: MongoDB Atlas might be blocking the IP of your hosting server.
- **Fix**: In MongoDB Atlas, go to "Network Access" and "Allow Access from Anywhere" (0.0.0.0/0) for testing.

## Summary Checklist
- [ ] Code is pushed to GitHub.
- [ ] Frontend is building successfully on Vercel/Netlify.
- [ ] Backend is running on Render/Railway.
- [ ] Database IP Whitelist is configured.
- [ ] Environment variables are added to both platforms.
- [ ] Frontend can successfully login/fetch data from the deployed backend.
