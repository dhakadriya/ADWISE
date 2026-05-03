# 🚀 Adwise Marketing System - Running Servers

## ✅ Currently Running

### Frontend (React)
- **URL**: http://localhost:3000
- **Status**: ✅ Running
- **Technology**: React + Tailwind CSS
- **Terminal**: Process ID 1

### Backend (FastAPI)
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Status**: ✅ Running
- **Technology**: Python FastAPI
- **Terminal**: Process ID 4

## 🎯 How to Use

1. **Open your browser** and go to: http://localhost:3000
2. **Refresh the page** (Ctrl+R or F5) to clear the previous errors
3. **Sign up** with any credentials:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
4. **Start exploring** the dashboard and features!

## 🔧 Backend API Endpoints

The backend now provides these working endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/{id}` - Update campaign
- `DELETE /api/campaigns/{id}` - Delete campaign

### Tracking Links
- `GET /api/tracking-links` - Get all tracking links
- `POST /api/tracking-links` - Create tracking link

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard metrics

## 🛑 To Stop Servers

If you need to stop the servers, press `Ctrl+C` in each terminal window, or I can stop them for you.

## 📝 Notes

- The backend uses in-memory storage (data resets on restart)
- For production, you'll need to add a real database (PostgreSQL, MongoDB, etc.)
- The frontend will now successfully connect to the backend
- All API calls should work without "Failed to fetch" errors

## 🎉 Issue Resolved!

The "Failed to fetch" errors were happening because:
1. ❌ The backend server wasn't running
2. ❌ The backend code didn't exist

Now:
1. ✅ Backend server is running on port 8000
2. ✅ Frontend can connect to the API
3. ✅ Authentication and data operations work

**Refresh your browser and try signing up!**
