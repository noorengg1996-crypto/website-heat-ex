#!/bin/bash
# Northern HeatEx Corporation - GitHub Push Helper Script
# Usage: ./push-to-github.sh <GITHUB_REPO_URL_OR_TOKEN_URL>
# Example: ./push-to-github.sh https://github.com/your-username/your-repo.git
# Or with token: ./push-to-github.sh https://ghp_YOUR_TOKEN@github.com/your-username/your-repo.git

set -e

if [ -z "$1" ]; then
  echo "Error: Please provide your GitHub repository URL."
  echo "Usage: ./push-to-github.sh https://github.com/USERNAME/REPO_NAME.git"
  echo "Or with Token: ./push-to-github.sh https://<YOUR_GITHUB_TOKEN>@github.com/USERNAME/REPO_NAME.git"
  exit 1
fi

REPO_URL="$1"

echo "1. Configuring git safe directory..."
git config --global --add safe.directory "*"

echo "2. Setting remote origin to: $REPO_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "3. Staging and verifying commit..."
git add -A
git commit -m "feat: Northern HeatEx Corporation latest website and gallery" || true

echo "4. Pushing to GitHub (main branch)..."
git push -u origin main --force

echo " Successfully pushed all files, galleries, and corporate logo to GitHub!"
