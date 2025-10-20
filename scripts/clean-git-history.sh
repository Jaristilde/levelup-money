#!/bin/bash

# ============================================
# GIT HISTORY CLEANUP SCRIPT
# ============================================
# This script removes exposed secrets from git history
# 
# CRITICAL WARNING:
# - This rewrites git history (destructive operation)
# - All team members must re-clone the repository
# - Run this ONLY after rotating all API keys
# - Requires BFG Repo-Cleaner (faster than git-filter-branch)
#
# ============================================

set -e  # Exit on error

echo "============================================"
echo "🔒 LEVELUP MONEY - Git History Cleanup"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if BFG is installed
if ! command -v bfg &> /dev/null; then
    echo -e "${RED}❌ ERROR: BFG Repo-Cleaner is not installed${NC}"
    echo ""
    echo "Install it using Homebrew:"
    echo "  brew install bfg"
    echo ""
    echo "Or download from: https://rtyley.github.io/bfg-repo-cleaner/"
    exit 1
fi

# Verify we're in a git repository
if [ ! -d .git ]; then
    echo -e "${RED}❌ ERROR: Not in a git repository${NC}"
    exit 1
fi

# Warning prompt
echo -e "${YELLOW}⚠️  WARNING: This will rewrite git history!${NC}"
echo ""
echo "Before proceeding, ensure you have:"
echo "  ✓ Rotated ALL API keys (Firebase, Supabase, etc.)"
echo "  ✓ Backed up your repository"
echo "  ✓ Informed all team members"
echo ""
echo "After this script runs:"
echo "  • All team members must re-clone the repository"
echo "  • Force push will be required (destructive!)"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "============================================"
echo "Step 1: Creating backup..."
echo "============================================"

# Create backup
BACKUP_DIR="../levelup-money-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r .git "$BACKUP_DIR/"
echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}"

echo ""
echo "============================================"
echo "Step 2: Removing .env file from history..."
echo "============================================"

# Remove .env file from all commits
bfg --delete-files .env

echo -e "${GREEN}✓ .env removed from history${NC}"

echo ""
echo "============================================"
echo "Step 3: Cleaning up repository..."
echo "============================================"

# Run git garbage collection
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo -e "${GREEN}✓ Repository cleaned${NC}"

echo ""
echo "============================================"
echo "✅ CLEANUP COMPLETE!"
echo "============================================"
echo ""
echo "NEXT STEPS (CRITICAL!):"
echo ""
echo "1. Verify the cleanup:"
echo "   git log --all --full-history -- .env"
echo "   (Should return no results)"
echo ""
echo "2. Force push to remote (THIS IS DESTRUCTIVE!):"
echo "   git push --force --all origin"
echo "   git push --force --tags origin"
echo ""
echo "3. Notify all team members to:"
echo "   • Delete their local clones"
echo "   • Re-clone the repository"
echo "   • Set up their .env file from .env.example"
echo ""
echo "4. Verify on GitHub that secrets are gone:"
echo "   • Check commit history"
echo "   • Review file contents"
echo ""
echo -e "${RED}⚠️  DO NOT SKIP STEP 2! The secrets are still in the remote repository.${NC}"
echo ""

