# Deployment Checklist

## Prerequisites
- [ ] GitHub account
- [ ] Vercel account
- [ ] HuggingFace account with API key

## Local Preparation
- [ ] Ensure all code changes are committed
- [ ] Verify that both the frontend and backend work locally
- [ ] Check that all environment variables are correctly set
- [ ] Update `vercel.json` files with appropriate configurations
- [ ] Make sure all necessary dependencies are in package.json

## Backend Deployment (Express API)
- [ ] Create a new project on Vercel
- [ ] Connect to the GitHub repository (root directory)
- [ ] Configure deployment settings:
  - [ ] Root Directory: `.` (root directory)
  - [ ] Output Directory: should be empty
  - [ ] Build Command: `npm install`
  - [ ] Development Command: `npm run dev`
- [ ] Set environment variables:
  - [ ] `PORT`: 3000
  - [ ] `NODE_ENV`: production
  - [ ] `MAX_EXECUTION_TIME`: 30000
  - [ ] `TEMP_FILE_LIFETIME`: 43200000
- [ ] Deploy the backend
- [ ] Copy the production URL for the next step

## Frontend Deployment (Next.js)
- [ ] Create a new project on Vercel
- [ ] Connect to the GitHub repository
- [ ] Configure deployment settings:
  - [ ] Root Directory: `ai-code-debugger`
  - [ ] Framework Preset: Next.js
- [ ] Set environment variables:
  - [ ] `HF_API_KEY`: your Hugging Face API key
  - [ ] `HF_MODEL`: microsoft/codebert-base
- [ ] Update `vercel.json` in the ai-code-debugger directory:
  ```json
  {
    "rewrites": [
      { "source": "/api/execute/:path*", "destination": "https://your-backend-url.vercel.app/api/execute/:path*" }
    ]
  }
  ```
  (Replace `your-backend-url.vercel.app` with the actual backend URL)
- [ ] Commit and push the changes
- [ ] Deploy the frontend
- [ ] Verify the frontend can communicate with the backend

## Post-Deployment
- [ ] Test the application thoroughly on the production URL
- [ ] Check console for any errors or warnings
- [ ] Verify that code debugging works with different languages
- [ ] Confirm that the local fallback works if the Hugging Face API is unavailable
- [ ] Monitor error logs in Vercel dashboard

## Troubleshooting
- If encountering CORS issues, make sure the backend has the appropriate CORS configuration
- If the frontend can't communicate with the backend, check the rewrites in `vercel.json`
- For serverless function timeout errors, consider optimizing your code or upgrading your Vercel plan
- For code execution issues, verify that the Vercel environment supports the necessary language runtimes

## Maintenance
- Remember to update your Hugging Face API key if it expires
- Periodically check for security updates to dependencies
- Consider setting up monitoring and alerting for your production environment 