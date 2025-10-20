# LevelUp Money - Financial Wellness Platform

⚠️ **SECURITY NOTICE**: This is proprietary software. See LICENSE file for terms.

## 🔒 Security & Confidentiality

**CRITICAL SECURITY REQUIREMENTS:**

- ✅ This repository contains proprietary code - DO NOT share publicly
- ✅ NEVER commit `.env` files or API keys to git
- ✅ All credentials must be stored securely in environment variables
- ✅ Review `.env.example` for required environment variables
- ✅ Follow security best practices for all development work

**Before Contributing:**
1. Ensure `.env` is in `.gitignore` (already configured)
2. Use `.env.example` as a template - NEVER commit actual secrets
3. Rotate API keys immediately if accidentally exposed
4. Report security issues privately to: security@levelupmoney.com

---

## Project info

**URL**: https://lovable.dev/projects/daadaa1b-0d05-4225-83b8-ffb0dac9e1c4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/daadaa1b-0d05-4225-83b8-ffb0dac9e1c4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Set up environment variables (CRITICAL!)
cp .env.example .env
# Edit .env with your actual API keys (DO NOT COMMIT THIS FILE!)

# Step 4: Install the necessary dependencies.
npm i

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

⚠️ **IMPORTANT**: After copying `.env.example` to `.env`, you MUST replace all placeholder values with your actual credentials. Never commit the `.env` file!

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/daadaa1b-0d05-4225-83b8-ffb0dac9e1c4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
