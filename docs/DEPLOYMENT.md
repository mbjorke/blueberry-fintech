# Deployment Guide

## 📍 Routes

- **Portfolio (Index)**: `/` - Marcus Björke's portfolio and chatbot
- **Dashboard**: `/dashboard` - Original fintech dashboard
- **Theme Demo**: `/themes` - Theme demonstration page

## 🔐 Environment Variables

### Required for Production

- `VITE_GEMINI_API_KEY` - Google Gemini API key for the chatbot functionality

### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

#### For CI/CD and Deployment:

- **`VITE_GEMINI_API_KEY`**: Your Google Gemini API key
  - Value: `AIzaSyBBS-NPuhj9SjQru88uqg0ZfubvsrZAVd8` (or your production key)
  - Used in: Build process (embedded in bundle at build time)

- **`FLY_API_TOKEN`** (if using Fly.io): Your Fly.io API token
  - Get it from: https://fly.io/user/personal_access_tokens

## 🚀 Deployment Options

### Option 1: Fly.io

The project is configured for Fly.io deployment.

**Prerequisites:**
- Fly.io account
- `FLY_API_TOKEN` secret in GitHub

**Deployment:**
- Automatic on push to `main` or `master` branch
- Manual via GitHub Actions workflow dispatch

**Configuration:**
- See `.github/workflows/deploy-fly.yml`
- See `fly.toml` for Fly.io settings

### Option 2: Netlify

The project is configured for Netlify deployment.

**Prerequisites:**
- Netlify account
- `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets in GitHub (if using GitHub Actions)

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: Set `VITE_GEMINI_API_KEY` in Netlify dashboard

**Configuration:**
- See `netlify.toml`

### Option 3: Vercel

**Prerequisites:**
- Vercel account
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets in GitHub

**Build Settings:**
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Set `VITE_GEMINI_API_KEY` in Vercel dashboard

## 🔧 Local Development

1. Copy `.env.example` to `.env` (if it exists) or create `.env`
2. Add your API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. Run `npm run dev`

## 📝 Important Notes

- **Vite Environment Variables**: Variables prefixed with `VITE_` are embedded in the client bundle at build time. They are **public** and visible in the browser.
- **Security**: Never commit API keys to the repository. Always use secrets/environment variables.
- **Build Time**: The Gemini API key is embedded during the build process, so it must be available when running `npm run build`.

## 🐳 Docker Deployment

If deploying with Docker:

```bash
docker build --build-arg VITE_GEMINI_API_KEY=your_key_here -t blueberry-fintech .
docker run -p 80:80 blueberry-fintech
```

Or using Docker Compose, add to your `docker-compose.yml`:

```yaml
services:
  app:
    build:
      context: .
      args:
        VITE_GEMINI_API_KEY: ${VITE_GEMINI_API_KEY}
    ports:
      - "80:80"
```

## ✅ Pre-Deployment Checklist

- [ ] GitHub secrets configured (`VITE_GEMINI_API_KEY`)
- [ ] Build passes locally (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Tests pass (`npm run test`)
- [ ] Environment variables set in deployment platform (if not using GitHub Actions)
- [ ] Routes tested locally (`/`, `/dashboard`, `/themes`)


