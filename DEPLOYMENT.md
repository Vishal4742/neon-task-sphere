# Vercel Deployment Guide

## Prerequisites
1. Your backend must be deployed first (Render, Railway, Heroku, etc.)
2. You need the backend API URL

## Step 1: Deploy Backend
Deploy your backend to any platform (Render, Railway, Heroku) and note the API URL.

## Step 2: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel
```

## Step 3: Set Environment Variables
In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api`
   - **Environment**: Production (and Preview if needed)

## Step 4: Redeploy
After setting environment variables, redeploy your project.

## Troubleshooting

### Issue: White screen or 404 errors
- Check that `VITE_API_URL` is set correctly
- Ensure your backend is running and accessible
- Check browser console for errors

### Issue: Build fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation passes
- Check Vercel build logs for specific errors

### Issue: API calls fail
- Verify CORS settings on your backend
- Check that the API URL is correct
- Ensure your backend accepts requests from your Vercel domain

## Environment Variables Reference
```
VITE_API_URL=https://your-backend-url.com/api
```

## Support
If you encounter issues:
1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Ensure backend is deployed and accessible 