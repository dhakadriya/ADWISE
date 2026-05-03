# ✅ Deployment Checklist - Ready to Deploy!

## 📋 Pre-Deployment Verification

### ✅ Files Ready
- [x] `main.py` - FastAPI application with all endpoints
- [x] `requirements.txt` - Includes fastapi, uvicorn, gunicorn
- [x] `Procfile` - Configured with gunicorn + uvicorn worker
- [x] `runtime.txt` - Python 3.12.0 specified
- [x] `.env.example` - Environment variables template
- [x] `README.md` - Complete documentation

### ✅ Dependencies Verified
```txt
✓ fastapi==0.109.0
✓ uvicorn[standard]==0.27.0
✓ gunicorn==21.2.0          ← Added for production
✓ pydantic[email]==2.5.3
✓ python-jose[cryptography]==3.3.0
✓ passlib[bcrypt]==1.7.4
✓ python-multipart==0.0.6
✓ PyJWT==2.8.0
```

### ✅ Procfile Configuration
```
web: gunicorn -k uvicorn.workers.UvicornWorker main:app
```
This uses Gunicorn with Uvicorn workers for production-grade performance.

---

## 🚀 Deployment Steps

### Option 1: Render (Recommended - Free Tier)

1. **Go to Render**
   - Visit [render.com](https://render.com)
   - Sign up or log in

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: adwise-backend
   Environment: Python 3
   Region: Choose closest to your users
   Branch: main
   Root Directory: adwise-backend-python
   
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn -k uvicorn.workers.UvicornWorker main:app
   ```

4. **Set Environment Variables**
   - Click "Environment" tab
   - Add:
     ```
     SECRET_KEY = your-super-secret-key-here-change-this
     ```
   - Generate a secure key:
     ```bash
     python -c "import secrets; print(secrets.token_urlsafe(32))"
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your URL: `https://adwise-backend.onrender.com`

6. **Verify Deployment**
   - Visit: `https://your-app.onrender.com/`
   - Should see: `{"message": "AdWise Backend Running 🚀"}`
   - Check API docs: `https://your-app.onrender.com/docs`

---

### Option 2: Railway

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `adwise-backend-python` folder

3. **Configure**
   - Railway auto-detects Python
   - Add environment variable:
     ```
     SECRET_KEY = your-secret-key
     ```

4. **Generate Domain**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Your URL: `https://adwise-backend.up.railway.app`

5. **Verify**
   - Visit your URL
   - Check `/docs` endpoint

---

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   # Windows
   winget install Heroku.HerokuCLI
   
   # Mac
   brew tap heroku/brew && brew install heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd adwise-backend-python
   heroku create adwise-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

---

## 🧪 Testing Your Deployment

### 1. Test Root Endpoint
```bash
curl https://your-backend-url.com/
```

**Expected Response:**
```json
{
  "message": "AdWise Backend Running 🚀",
  "status": "running",
  "version": "1.0.0"
}
```

### 2. Test Health Check
```bash
curl https://your-backend-url.com/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "message": "API is operational"
}
```

### 3. Test API Documentation
Visit: `https://your-backend-url.com/docs`

You should see interactive Swagger UI with all endpoints.

### 4. Test User Registration
```bash
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGci...",
  "token_type": "bearer"
}
```

### 5. Test Login
```bash
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=password123"
```

### 6. Test Dashboard Analytics
```bash
curl https://your-backend-url.com/api/analytics/dashboard
```

---

## 🔗 Update Frontend

After successful backend deployment:

### 1. Create `.env` file in `adwise-marketing-system/`
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### 2. Or update `src/services/api.js`
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.com/api';
```

### 3. Test locally
```bash
cd adwise-marketing-system
npm start
```

Try signing up and logging in to verify connection.

### 4. Build for production
```bash
npm run build
```

### 5. Deploy frontend to Netlify
- Drag and drop `build` folder to Netlify
- Or connect GitHub for auto-deployment

---

## 🔒 Security Checklist

- [ ] Changed SECRET_KEY from default
- [ ] Using environment variables (not hardcoded)
- [ ] CORS configured (can restrict to frontend URL later)
- [ ] HTTPS enabled (automatic on all platforms)
- [ ] No sensitive data in Git repository
- [ ] `.env` file in `.gitignore`

---

## 📊 Monitoring

### Check Logs

**Render:**
- Dashboard → Your Service → Logs tab

**Railway:**
- Project → Deployments → View Logs

**Heroku:**
```bash
heroku logs --tail
```

### Monitor Performance
- Response times
- Error rates
- Memory usage
- Request counts

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Check:**
- All dependencies in `requirements.txt`
- Python version in `runtime.txt`
- No syntax errors in `main.py`

**Solution:**
```bash
# Test locally first
pip install -r requirements.txt
python main.py
```

### Issue: App Crashes on Start

**Check logs for:**
- Missing environment variables
- Import errors
- Port binding issues

**Solution:**
- Verify `SECRET_KEY` is set
- Check all imports are in `requirements.txt`

### Issue: CORS Errors

**Solution:**
1. Verify CORS middleware in `main.py`
2. Check `allow_origins` includes frontend URL
3. Restart backend service

### Issue: 502 Bad Gateway

**Solution:**
1. Check if app is running (visit `/health`)
2. Verify Procfile command is correct
3. Check logs for startup errors

---

## ✅ Final Checklist

Before going live:

- [ ] Backend deployed successfully
- [ ] Root endpoint returns correct message
- [ ] `/health` endpoint working
- [ ] `/docs` shows API documentation
- [ ] User registration working
- [ ] User login working
- [ ] All API endpoints tested
- [ ] Frontend connected to backend
- [ ] Frontend deployed
- [ ] Full app tested end-to-end
- [ ] Logs monitored
- [ ] Performance acceptable

---

## 🎉 Success!

Your Adwise backend is now live and production-ready!

**Your Backend URL:** `https://your-app.onrender.com`
**API Documentation:** `https://your-app.onrender.com/docs`

### Next Steps:
1. ✅ Backend deployed
2. 🔄 Deploy frontend to Netlify
3. 🔗 Connect frontend to backend
4. 🧪 Test full application
5. 📊 Monitor performance
6. 🗄️ Add database when needed

---

## 📞 Support Resources

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Heroku Docs**: [devcenter.heroku.com](https://devcenter.heroku.com)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)

---

**Happy Deploying! 🚀**

**Last Updated:** May 3, 2026
