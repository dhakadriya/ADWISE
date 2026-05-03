# 🚀 Quick Deployment Guide

## Deploy to Render (Recommended - Free)

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable:
   - `SECRET_KEY` = `your-secret-key-here`
6. Click "Create Web Service"
7. Get your URL: `https://your-app.onrender.com`

## Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo
4. Add environment variable: `SECRET_KEY`
5. Get your URL from Settings → Generate Domain

## Update Frontend

After deployment, update frontend `.env`:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Test Deployment

Visit: `https://your-backend-url.com/`

Should see: `{"message": "AdWise Backend Running 🚀"}`

## API Docs

Visit: `https://your-backend-url.com/docs`
