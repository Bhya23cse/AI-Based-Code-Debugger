# AI Code Debugger

An advanced web-based AI code debugging tool that uses Hugging Face AI models to analyze code and provide intelligent debugging suggestions through Natural Language Processing.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **UI**: React with Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Code Highlighting**: PrismJS, React Syntax Highlighter

### Backend
- **API**: Node.js with Express
- **Code Execution**: Native execution environment for multiple languages
- **AI Model**: Hugging Face CodeBERT model
- **Security**: Helmet.js, rate limiting, secure environment variables

### Deployment
- **Platform**: Vercel (both frontend and serverless backend)
- **CI/CD**: GitHub integration with Vercel

## ✨ Features

- **AI-Powered Code Analysis**: Identifies bugs, errors, and potential improvements
- **Multiple Language Support**: Python, JavaScript, Java, and C++
- **Code Execution**: Run and test code directly in the application
- **Local Fallback Analysis**: Basic code analysis even when AI service is temporarily unavailable
- **Modern 3D UI**: Engaging interactive background using Three.js
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Installation and Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-code-debugger.git
   ```

2. **Setup Frontend**
   ```bash
   cd ai-code-debugger
   npm install
   ```

3. **Create environment variables**
   Create a `.env.local` file in the ai-code-debugger directory:
   ```
   HF_API_KEY=your_huggingface_api_key
   HF_MODEL=microsoft/codebert-base
   ```

4. **Setup Backend**
   ```bash
   cd ..
   npm install
   ```

5. **Create environment variables for backend**
   Create a `.env` file in the root directory:
   ```
   PORT=3001
   NODE_ENV=development
   MAX_EXECUTION_TIME=30000
   TEMP_FILE_LIFETIME=43200000
   ```

6. **Start development servers**

   Start the backend:
   ```bash
   npm run dev
   ```
   
   In a separate terminal, start the frontend:
   ```bash
   cd ai-code-debugger
   npm run dev
   ```

7. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

### Deploying to Vercel

#### Frontend Deployment
1. Fork/clone this repository to your GitHub account
2. Sign in to [Vercel](https://vercel.com)
3. Create a new project and import your GitHub repository
4. For the project settings:
   - Root Directory: `ai-code-debugger`
   - Framework Preset: Next.js
5. Add environment variables:
   - `HF_API_KEY`: Your Hugging Face API key
   - `HF_MODEL`: microsoft/codebert-base
6. Deploy and wait for the build to complete

#### Backend Deployment
1. Create a new project in Vercel
2. For the project settings:
   - Root Directory: `.` (root directory)
   - Build Command: `npm install`
   - Output Directory: Leave empty
   - Development Command: `npm run dev`
3. Add environment variables:
   - `PORT`: 3000
   - `NODE_ENV`: production
   - `MAX_EXECUTION_TIME`: 30000
   - `TEMP_FILE_LIFETIME`: 43200000
4. Deploy and wait for the build to complete

5. **Update Frontend Configuration**
   After deploying the backend, update the `ai-code-debugger/vercel.json` file:
   ```json
   {
     "rewrites": [
       { "source": "/api/execute/:path*", "destination": "https://your-backend-url.vercel.app/api/execute/:path*" }
     ]
   }
   ```
   Replace `your-backend-url.vercel.app` with your actual backend deployment URL.

6. Redeploy the frontend to apply the changes

## 🛡️ Security Notes

- The application uses environment variables for API key storage
- Rate limiting is implemented to prevent abuse
- Security headers are set with Helmet.js
- Temporary files are automatically cleaned up

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 