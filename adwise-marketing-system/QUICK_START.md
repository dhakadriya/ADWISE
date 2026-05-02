# Quick Start Guide - Adwise Marketing System

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd adwise-marketing-system
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Login
- Click on the login page
- Enter any email and password (authentication is simplified for demo)
- You'll be redirected to the dashboard

## 📱 Pages Overview

### 1. **Login/Signup** (`/login`, `/signup`)
- Clean authentication pages with gradient backgrounds
- Social login buttons (Google, GitHub)
- Form validation

### 2. **Dashboard** (`/dashboard`)
- 4 key metric cards (Campaigns, Conversions, Revenue, CAC)
- Line chart showing performance over time
- Pie chart for channel contribution
- Bar chart for campaign comparison

### 3. **Campaigns** (`/campaigns`)
- Table view of all campaigns
- Create new campaigns with modal form
- Edit and delete functionality
- Status badges (Active/Paused)

### 4. **Tracking Links** (`/tracking-links`)
- Generate UTM tracking links
- Copy to clipboard functionality
- Preview generated URLs
- Organized by source, medium, and campaign

### 5. **Customer Journey** (`/customer-journey`)
- Visual flow from Ad Click → Purchase
- Conversion rates between steps
- Recent customer touchpoints
- Journey timeline

### 6. **Analytics** (`/analytics`)
- Attribution model comparison (First Click, Last Click, Multi-Touch)
- Interactive bar chart
- Channel performance table
- ROI metrics

### 7. **AI Recommendations** (`/ai-insights`)
- AI-powered insights cards
- Impact levels (High, Medium, Low)
- Confidence scores
- Actionable recommendations

### 8. **Fraud Detection** (`/fraud-detection`)
- Real-time alerts
- Severity levels (High, Medium, Low)
- Protection rules toggles
- Blocked sources management

### 9. **Settings** (`/settings`)
- Profile management
- Security settings (password, 2FA)
- Notification preferences
- Platform integrations
- Billing information

## 🎨 Design Features

### Color Palette
- **Primary Blue**: Used for main actions and highlights
- **Purple**: Used for secondary elements and gradients
- **Green**: Success states and positive metrics
- **Red**: Alerts and warnings
- **Gray**: Neutral backgrounds and text

### UI Components
- **Cards**: Rounded corners with subtle shadows and hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Tables**: Clean design with alternating row colors on hover
- **Charts**: Interactive with tooltips and legends
- **Modals**: Centered overlays with backdrop

### Responsive Breakpoints
- **Mobile**: < 768px (Hamburger menu, stacked layout)
- **Tablet**: 768px - 1024px (Sidebar visible, optimized spacing)
- **Desktop**: > 1024px (Full layout with sidebar)

## 🔧 Customization Tips

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#YOUR_DARKER_COLOR',
  }
}
```

### Add New Navigation Item
1. Edit `src/components/Layout.js`
2. Add to `navigation` array:
```javascript
{ name: 'New Page', href: '/new-page', icon: YourIcon }
```

### Create New Page
1. Create `src/pages/NewPage.js`
2. Add route in `src/App.js`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

## 📊 Sample Data

All pages use mock data for demonstration:
- Dashboard metrics are hardcoded
- Charts use sample datasets
- Tables show example entries
- In production, replace with API calls

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm start
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Working
```bash
# Rebuild Tailwind
npm run build:css
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📝 Next Steps

1. **Connect to Backend**: Replace mock data with real API calls
2. **Add Authentication**: Implement JWT or OAuth
3. **Database Integration**: Store campaigns, links, and user data
4. **Real-time Updates**: Add WebSocket for live metrics
5. **Export Features**: Add PDF/CSV export for reports
6. **Email Notifications**: Integrate email service for alerts
7. **Advanced Analytics**: Add more chart types and filters

## 💡 Tips for Development

- Use React DevTools for debugging
- Check browser console for errors
- Test responsive design with browser DevTools
- Use Tailwind IntelliSense extension in VS Code
- Keep components small and reusable

## 🎯 Key Features to Explore

1. **Sidebar Navigation**: Click different menu items to explore pages
2. **Create Campaign**: Click "Create Campaign" button on Campaigns page
3. **Generate Link**: Try the UTM link generator on Tracking Links page
4. **Attribution Models**: Switch between different models on Analytics page
5. **AI Insights**: Review recommendations on AI Insights page
6. **Settings Tabs**: Navigate through different settings sections

---

Enjoy building with Adwise Marketing System! 🎉
