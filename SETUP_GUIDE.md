# 🚀 Adwise Setup Guide

Complete guide to run your Adwise Marketing System locally.

---

## 📋 Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.11+
- **Git**

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Start Backend

```bash
# Navigate to backend folder
cd adwise-backend-python

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
```

✅ Backend running on: **http://localhost:8000**

---

### Step 2: Start Frontend

Open a **new terminal**:

```bash
# Navigate to frontend folder
cd adwise-marketing-system

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

✅ Frontend running on: **http://localhost:3000**

---

## 🌐 Access the Application

1. **Open browser**: http://localhost:3000
2. **Sign up**: Create a new account
3. **Login**: Use your credentials
4. **Explore**: All features are now available!

---

## 🔧 Configuration

### Backend Configuration

**File**: `adwise-backend-python/main.py`

- **Port**: 8000
- **CORS**: Enabled for all origins
- **Database**: In-memory (data resets on restart)

### Frontend Configuration

**File**: `adwise-marketing-system/.env`

```env
REACT_APP_API_URL=http://localhost:8000/api
```

For production:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/{id}` - Update campaign
- `DELETE /api/campaigns/{id}` - Delete campaign

### Tracking Links
- `GET /api/tracking-links` - Get all links
- `POST /api/tracking-links` - Create link

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard metrics (real-time calculated data)

### Health Check
- `GET /health` - Check API health
- `GET /` - API info

**Interactive API Docs**: http://localhost:8000/docs

---

## 🗄️ Database

### Current Setup
- **Type**: In-memory storage
- **Data**: Stored in Python dictionaries
- **Persistence**: None (resets on server restart)
- **Note**: All static/mock data has been removed. The system now uses real data calculated from user-created campaigns and tracking links.

### Data Structure

**Users**:
```python
{
    "email": {
        "name": "John Doe",
        "email": "john@example.com",
        "hashed_password": "..."
    }
}
```

**Campaigns**:
```python
[
    {
        "id": 1,
        "name": "Summer Sale",
        "channel": "Google Ads",
        "budget": 5000.00,
        "status": "ACTIVE",
        "start_date": "2024-06-01",
        "end_date": "2024-08-31",
        "conversions": 150
    }
]
```

**Tracking Links**:
```python
[
    {
        "id": 1,
        "name": "Campaign Link",
        "url": "https://example.com",
        "utm_source": "google",
        "utm_medium": "cpc",
        "utm_campaign": "summer_sale",
        "utm_term": "",
        "utm_content": ""
    }
]
```

### Dashboard Analytics
The dashboard now displays **real-time calculated metrics**:
- **Total Campaigns**: Count of all campaigns
- **Total Conversions**: Sum of conversions from all campaigns
- **Total Revenue**: Sum of budgets from all campaigns
- **Customer Acquisition Cost (CAC)**: Total revenue / Total conversions
- **Channel Distribution**: Conversions grouped by campaign channel
- **Top Campaigns**: Top 5 campaigns sorted by conversions

---

## 🎯 Features

### ✅ Implemented
- User authentication (JWT)
- Campaign management (CRUD)
- Tracking link generation
- Dashboard analytics with real-time data
- Premium dark mode UI
- Responsive design
- Real-time updates
- No static/mock data - all metrics calculated from real campaigns

### 📝 Data Flow
1. User signs up/logs in
2. JWT token stored in localStorage
3. All API calls include token
4. Backend validates token
5. Returns user-specific data
6. Dashboard calculates metrics from campaigns in real-time
7. Charts display actual campaign data

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill the process if needed
taskkill /PID <process_id> /F

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend not starting?
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <process_id> /F

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors?
- Make sure backend is running on port 8000
- Check `.env` file has correct API URL
- Restart both servers

### API not connecting?
1. Check backend is running: http://localhost:8000
2. Check `.env` file: `REACT_APP_API_URL=http://localhost:8000/api`
3. Clear browser cache
4. Restart frontend: `npm start`

---

## 🚀 Production Deployment

### Backend (Render)
Already deployed at: https://adwise-tho4.onrender.com

### Frontend (Netlify)

1. **Build**:
```bash
cd adwise-marketing-system
npm run build
```

2. **Deploy**:
```bash
netlify deploy --prod
```

3. **Environment Variables**:
```
REACT_APP_API_URL=https://adwise-tho4.onrender.com/api
```

---

## 📝 Development Workflow

### Making Changes

1. **Backend Changes**:
   - Edit `adwise-backend-python/main.py`
   - Server auto-reloads (if using `--reload` flag)
   - Test at http://localhost:8000/docs

2. **Frontend Changes**:
   - Edit files in `adwise-marketing-system/src/`
   - Hot reload automatically updates browser
   - Check console for errors

### Testing

1. **Backend**:
   - Visit http://localhost:8000/docs
   - Test endpoints interactively

2. **Frontend**:
   - Open http://localhost:3000
   - Test all pages and features
   - Check browser console for errors

---

## 🎨 Project Structure

```
ADWISE/
├── adwise-backend-python/
│   ├── main.py              ← Backend API
│   ├── requirements.txt     ← Python dependencies
│   └── README.md
│
├── adwise-marketing-system/
│   ├── src/
│   │   ├── components/      ← React components
│   │   ├── pages/           ← Application pages
│   │   └── services/
│   │       └── api.js       ← API configuration
│   ├── .env                 ← Environment variables
│   ├── package.json
│   └── README.md
│
└── README.md                ← Main documentation
```

---

## ✅ Checklist

Before starting development:
- [ ] Python 3.11+ installed
- [ ] Node.js 16+ installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can sign up and login

---

## 🎉 You're Ready!

Your Adwise Marketing System is now running locally!

**Next Steps**:
1. Sign up at http://localhost:3000/signup
2. Login and explore the dashboard
3. Create campaigns
4. Generate tracking links
5. View analytics

**Happy coding! 🚀**
