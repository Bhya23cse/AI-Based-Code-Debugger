#!/bin/bash
# AI Code Debugger deployment script

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  AI Code Debugger Deployment Assistant  ${NC}"
echo -e "${GREEN}=========================================${NC}"

# Check for required commands
command -v git >/dev/null 2>&1 || { echo -e "${RED}Error: git is required but not installed. Please install git and try again.${NC}" >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}Error: npm is required but not installed. Please install Node.js and npm, then try again.${NC}" >&2; exit 1; }

# Git repository setup
if [ ! -d ".git" ]; then
  echo -e "${YELLOW}No Git repository detected. Would you like to initialize one? (y/n)${NC}"
  read setup_git
  if [ "$setup_git" = "y" ]; then
    git init
    echo -e "${GREEN}Git repository initialized.${NC}"
    
    echo -e "${YELLOW}Please enter your GitHub repository URL (e.g., https://github.com/username/repo.git):${NC}"
    read github_url
    
    if [ ! -z "$github_url" ]; then
      git remote add origin $github_url
      echo -e "${GREEN}Remote repository added.${NC}"
    fi
  fi
fi

# Install dependencies
echo -e "\n${YELLOW}Installing backend dependencies...${NC}"
npm install

echo -e "\n${YELLOW}Installing frontend dependencies...${NC}"
cd ai-code-debugger
npm install
cd ..

# Check for environment variables
if [ ! -f ".env" ]; then
  echo -e "\n${YELLOW}Creating .env file for backend...${NC}"
  echo "PORT=3001" > .env
  echo "NODE_ENV=development" >> .env
  echo "MAX_EXECUTION_TIME=30000" >> .env
  echo "TEMP_FILE_LIFETIME=43200000" >> .env
  echo -e "${GREEN}.env file created for backend.${NC}"
fi

if [ ! -f "ai-code-debugger/.env.local" ]; then
  echo -e "\n${YELLOW}Creating .env.local file for frontend...${NC}"
  echo -e "${YELLOW}Please enter your HuggingFace API key:${NC}"
  read hf_api_key
  
  echo "HF_API_KEY=$hf_api_key" > ai-code-debugger/.env.local
  echo "HF_MODEL=microsoft/codebert-base" >> ai-code-debugger/.env.local
  echo -e "${GREEN}.env.local file created for frontend.${NC}"
fi

# Git commit
echo -e "\n${YELLOW}Would you like to commit your changes? (y/n)${NC}"
read should_commit
if [ "$should_commit" = "y" ]; then
  git add .
  echo -e "${YELLOW}Enter a commit message:${NC}"
  read commit_message
  if [ -z "$commit_message" ]; then
    commit_message="Initial commit for AI Code Debugger"
  fi
  git commit -m "$commit_message"
  
  echo -e "\n${YELLOW}Would you like to push to GitHub? (y/n)${NC}"
  read should_push
  if [ "$should_push" = "y" ]; then
    git push -u origin main
    echo -e "${GREEN}Changes pushed to GitHub.${NC}"
  fi
fi

# Deployment instructions
echo -e "\n${GREEN}=====================================${NC}"
echo -e "${GREEN}  Next Steps for Vercel Deployment    ${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "1. Go to ${YELLOW}https://vercel.com${NC} and sign in"
echo -e "2. Create two new projects:"
echo -e "   a. For the backend (root directory)"
echo -e "   b. For the frontend (ai-code-debugger directory)"
echo -e "3. Configure environment variables for each project"
echo -e "4. Deploy both projects"
echo -e "5. Update the frontend vercel.json with your backend URL"
echo -e "\n${GREEN}For detailed instructions, refer to DEPLOYMENT_CHECKLIST.md${NC}"

echo -e "\n${GREEN}Deployment preparation complete!${NC}" 