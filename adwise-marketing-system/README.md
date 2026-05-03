# Adwise Marketing System

A modern, full-stack marketing attribution and analytics platform with real-time data visualization, designed for small and medium-sized businesses.

## 🎨 Features

### Frontend Features
- **Clean SaaS Dashboard Design** - Modern UI with sidebar navigation and top bar
- **Smooth Animations** - Professional animations using Framer Motion
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Authentication** - Login and Signup with JWT token-based authentication
- **Dashboard** - Key metrics with interactive animated charts (Line, Pie, Bar charts)
- **Campaign Management** - Create, edit, and delete marketing campaigns
- **Tracking Links** - Generate and manage UTM tracking links
- **Customer Journey** - Visualize customer flow from ad click to purchase
- **Analytics & Attribution** - Multiple attribution models (First Click, Last Click, Multi-Touch)
- **AI Recommendations** - Data-driven insights to optimize marketing performance
- **Fraud Detection** - Monitor and prevent fraudulent activity
- **Settings** - User profile, security, notifications, integrations, and billing

### Backend Features
- **FastAPI Backend** - High-performance Python REST API
- **JWT Authentication** - Secure token-based authentication
- **CORS Enabled** - Cross-origin resource sharing configured
- **RESTful Endpoints** - Clean API design
- **In-Memory Storage** - Quick setup (easily replaceable with database)

## 🚀 Tech Stack

### Frontend
- **React** - Frontend framework
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Professional animation library

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **PyJWT** - JSON Web Token implementation
- **Python 3.12+** - Programming language

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.12+
- Git

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd adwise-marketing-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd adwise-backend-python
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
python main.py
```

4. Backend API will be available at:
```
http://localhost:8000
```

5. View API documentation at:
```
http://localhost:8000/docs
```

## 🎯 Usage

1. **Signup**: Create an account at `/signup`
2. **Login**: Sign in at `/login`
3. **Dashboard**: View key metrics and performance charts
4. **Campaigns**: Create and manage your marketing campaigns
5. **Tracking Links**: Generate UTM links for campaign tracking
6. **Customer Journey**: Analyze customer touchpoints and conversion flow
7. **Analytics**: Compare attribution models and channel performance
8. **AI Insights**: Review AI-powered recommendations
9. **Fraud Detection**: Monitor alerts and block suspicious activity
10. **Settings**: Configure your profile, security, and integrations

## 📁 Project Structure

```
ADWISE/
├── adwise-marketing-system/          # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.js            # Main layout with sidebar
│   │   │   ├── Card.js              # Reusable card component
│   │   │   ├── StatCard.js          # Statistics card
│   │   │   ├── Modal.js             # Modal dialog
│   │   │   └── AdwiseTracker.js     # Tracking component
│   │   ├── pages/
│   │   │   ├── Login.js             # Login page (animated)
│   │   │   ├── Signup.js            # Signup page (animated)
│   │   │   ├── Dashboard.js         # Main dashboard (animated)
│   │   │   ├── Campaigns.js         # Campaign management
│   │   │   ├── TrackingLinks.js     # UTM link generator
│   │   │   ├── CustomerJourney.js   # Customer flow
│   │   │   ├── Analytics.js         # Attribution analytics
│   │   │   ├── AIRecommendations.js # AI insights
│   │   │   ├── FraudDetection.js    # Fraud monitoring
│   │   │   └── Settings.js          # User settings
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── utils/
│   │   │   └── animations.js        # Animation utilities
│   │   ├── hooks/
│   │   │   ├── useWebSocket.js      # WebSocket hook
│   │   │   └── useRealtimeData.js   # Real-time data hook
│   │   ├── App.js                   # Main app with routing
│   │   ├── index.js                 # Entry point
│   │   └── index.css                # Global styles
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── package.json                 # Dependencies
│   └── README.md                    # Frontend documentation
│
├── adwise-backend-python/            # Backend FastAPI application
│   ├── app/
│   │   ├── routers/                 # API route handlers
│   │   └── services/                # Business logic
│   ├── main.py                      # FastAPI application
│   ├── requirements.txt             # Python dependencies
│   └── README.md                    # Backend documentation
│
└── README.md                        # This file
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#0ea5e9` (Tailwind: primary-500)
- **Purple**: `#a855f7` (Tailwind: purple-500)
- **Background**: `#f9fafb` (Tailwind: gray-50)
- **White**: `#ffffff`

### Animations
- **Entry**: Fade in with slide up
- **Hover**: Scale and lift effects
- **Click**: Press down feedback
- **Stagger**: Sequential element appearance

### Components
- **Cards**: Rounded corners with subtle shadows and hover effects
- **Buttons**: Gradient backgrounds with hover and tap animations
- **Tables**: Clean design with hover states
- **Charts**: Interactive with tooltips, legends, and scale-in animations
- **Modals**: Centered with backdrop overlay

## 🔧 API Endpoints

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

### Health Check
- `GET /health` - Check API health status

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Tokens are sent in Authorization header
- Tokens expire after 30 minutes
- Automatic logout on token expiration

## 🎬 Animations

The app includes professional animations powered by Framer Motion:
- **Page Transitions**: Smooth fade-in effects
- **Hover Effects**: Cards lift, buttons scale
- **Click Feedback**: Tactile button press
- **Stagger Effects**: Sequential element appearance
- **Chart Animations**: Scale-in with delay
- **60fps Performance**: GPU-accelerated

See `ANIMATIONS_SUMMARY.md` for detailed animation documentation.

## 🚀 Build for Production

### Frontend
```bash
cd adwise-marketing-system
npm run build
```

This creates an optimized production build in the `build/` folder.

### Backend
```bash
cd adwise-backend-python
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔄 Development Workflow

1. **Start Backend**: `cd adwise-backend-python && python main.py`
2. **Start Frontend**: `cd adwise-marketing-system && npm start`
3. **Access App**: http://localhost:3000
4. **API Docs**: http://localhost:8000/docs

## 📝 Notes

- Backend uses in-memory storage (data resets on restart)
- For production, integrate a real database (PostgreSQL, MongoDB, etc.)
- Charts use sample data for demonstration
- Authentication is simplified for demo purposes
- CORS is configured for development (update for production)

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time WebSocket updates
- [ ] Email notifications
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced analytics and reporting
- [ ] Multi-user support with roles
- [ ] Payment integration
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
npx kill-port 3000
npm start
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Port 8000 already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

**Module not found:**
```bash
pip install -r requirements.txt
```

### CORS Issues

If you see CORS errors:
1. Ensure backend is running on port 8000
2. Check `main.py` CORS configuration
3. Restart both frontend and backend

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 📚 Documentation

- [README.md](./README.md) - This file
- [GET_STARTED.md](./adwise-marketing-system/GET_STARTED.md) - Quick start guide
- [QUICK_START.md](./adwise-marketing-system/QUICK_START.md) - Fast-track setup
- [COMPONENTS.md](./adwise-marketing-system/COMPONENTS.md) - Component documentation
- [PAGES_GUIDE.md](./adwise-marketing-system/PAGES_GUIDE.md) - Page layouts
- [DEPLOYMENT.md](./adwise-marketing-system/DEPLOYMENT.md) - Deployment guide
- [ANIMATIONS_SUMMARY.md](./ANIMATIONS_SUMMARY.md) - Animation documentation
- [RUNNING_SERVERS.md](./RUNNING_SERVERS.md) - Server status and commands

## 🌟 What Makes This Special

1. **Full-Stack**: Complete frontend and backend implementation
2. **Modern**: Latest React, FastAPI, and best practices
3. **Animated**: Professional animations throughout
4. **Documented**: Comprehensive guides for every aspect
5. **Responsive**: Works perfectly on all devices
6. **Professional**: Production-ready code quality
7. **Customizable**: Easy to modify and extend
8. **Beginner-Friendly**: Clear code and extensive documentation

---

**Built with ❤️ using React, FastAPI, Tailwind CSS, and Framer Motion**

Last updated: May 3, 2026
