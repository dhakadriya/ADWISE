# ✅ Backend Connected!

Your frontend is now connected to the deployed backend!

## 🔗 Configuration

### Backend URL
```
https://adwise-tho4.onrender.com
```

### API Endpoints
```
https://adwise-tho4.onrender.com/api
```

---

## 📝 What Was Updated

### 1. ✅ `src/services/api.js`
Updated default API URL:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://adwise-tho4.onrender.com/api';
```

### 2. ✅ `.env` (Created)
```env
REACT_APP_API_URL=https://adwise-tho4.onrender.com/api
```

### 3. ✅ `.env.example` (Created)
Template for other developers

### 4. ✅ `.gitignore` (Updated)
Added `.env` to prevent committing sensitive data

---

## 🧪 Test the Connection

### Step 1: Restart Frontend
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

### Step 2: Test Signup
1. Go to: `http://localhost:3000/signup`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Create account"
4. ✅ If successful, you'll be redirected to the dashboard!

### Step 3: Test Login
1. Go to: `http://localhost:3000/login`
2. Use the same credentials
3. Click "Sign in"
4. ✅ Should redirect to dashboard

### Step 4: Check Browser Console
Press F12 and check:
- ✅ No CORS errors
- ✅ No 404 errors
- ✅ API calls successful (200 status)

---

## 🎯 Expected Behavior

### ✅ Working Correctly:
- Signup creates account and returns JWT token
- Login authenticates and redirects to dashboard
- Dashboard loads with data
- All pages accessible
- No console errors

### ❌ If You See Errors:

**CORS Error:**
- Backend CORS is already configured for all origins
- Should not happen

**404 Error:**
- Check backend URL is correct
- Verify backend is running: https://adwise-tho4.onrender.com/

**Connection Refused:**
- Backend might be sleeping (Render free tier)
- Visit backend URL to wake it up
- Wait 30 seconds and try again

---

## 🚀 Deploy Frontend to Netlify

Once everything works locally:

### Step 1: Build
```bash
npm run build
```

### Step 2: Deploy to Netlify
1. Go to: https://app.netlify.com
2. Drag and drop the `build` folder
3. Or connect GitHub for auto-deployment

### Step 3: Add Environment Variable in Netlify
1. Go to: Site settings → Environment variables
2. Add:
   - Key: `REACT_APP_API_URL`
   - Value: `https://adwise-tho4.onrender.com/api`
3. Redeploy

### Step 4: Test Production
Visit your Netlify URL and test signup/login

---

## 🔄 Switch Between Local and Production Backend

### Use Production Backend (Current):
```env
# .env
REACT_APP_API_URL=https://adwise-tho4.onrender.com/api
```

### Use Local Backend:
```env
# .env
REACT_APP_API_URL=http://localhost:8000/api
```

Then restart: `npm start`

---

## 📊 Your Full Stack

```
┌─────────────────────────────────────┐
│    FRONTEND (Local/Netlify)         │
│    http://localhost:3000            │
│    - React + Tailwind + Animations  │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────────────┐
│    BACKEND (Render)                 │
│    https://adwise-tho4.onrender.com │
│    - FastAPI + JWT Auth             │
│    - Python 3.11.9                  │
│    - Gunicorn + Uvicorn             │
└─────────────────────────────────────┘
```

---

## ✅ Connection Checklist

- [x] Backend deployed on Render
- [x] Backend URL updated in api.js
- [x] .env file created
- [x] .env added to .gitignore
- [ ] Frontend restarted
- [ ] Signup tested
- [ ] Login tested
- [ ] Dashboard loads
- [ ] No console errors
- [ ] Ready to deploy frontend

---

## 🎉 You're Connected!

Your frontend is now talking to your deployed backend!

**Next Steps:**
1. Restart frontend: `npm start`
2. Test signup and login
3. Verify everything works
4. Deploy frontend to Netlify
5. Celebrate! 🎊

---

## 🐛 Troubleshooting

### Backend is Sleeping (Render Free Tier)
**Symptom:** First request takes 30+ seconds

**Solution:**
- Visit https://adwise-tho4.onrender.com/ to wake it up
- Wait for "AdWise Backend Running 🚀" message
- Then try frontend again

### CORS Errors
**Solution:**
- Backend CORS is configured for all origins
- Should not happen
- If it does, check backend logs on Render

### 401 Unauthorized
**Solution:**
- Clear browser localStorage
- Try signup again with new email

---

**Happy Testing! 🚀**

Your full-stack app is now connected and ready!
