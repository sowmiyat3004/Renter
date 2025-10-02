#!/bin/bash

echo "🚀 Deploying Renter Platform to Railway"
echo "======================================"

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo "❌ You have uncommitted changes. Please commit them first:"
    git status -s
    exit 1
fi

echo "✅ Git is clean"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "🎉 Ready for Railway deployment!"
echo ""
echo "Next steps:"
echo "1. Go to https://railway.app"
echo "2. Sign up with GitHub"
echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
echo "4. Select your Renter repository"
echo "5. Add PostgreSQL database"
echo "6. Add environment variables"
echo "7. Deploy!"
echo ""
echo "📖 Full guide: See RAILWAY_DEPLOYMENT.md"
