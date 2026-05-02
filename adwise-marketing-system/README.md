# Adwise Marketing System

A modern, responsive, and user-friendly web application for unified marketing attribution and analytics, designed for small and medium-sized businesses.

## 🎨 Features

- **Clean SaaS Dashboard Design** - Modern UI with sidebar navigation and top bar
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Authentication** - Login and Signup pages with clean centered card UI
- **Dashboard** - Key metrics with interactive charts (Line, Pie, Bar charts)
- **Campaign Management** - Create, edit, and delete marketing campaigns
- **Tracking Links** - Generate and manage UTM tracking links
- **Customer Journey** - Visualize customer flow from ad click to purchase
- **Analytics & Attribution** - Multiple attribution models (First Click, Last Click, Multi-Touch)
- **AI Recommendations** - Data-driven insights to optimize marketing performance
- **Fraud Detection** - Monitor and prevent fraudulent activity
- **Settings** - User profile, security, notifications, integrations, and billing

## 🚀 Tech Stack

- **React** - Frontend framework
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. Navigate to the project directory:
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

## 🎯 Usage

1. **Login/Signup**: Start by creating an account or logging in
2. **Dashboard**: View key metrics and performance charts
3. **Campaigns**: Create and manage your marketing campaigns
4. **Tracking Links**: Generate UTM links for campaign tracking
5. **Customer Journey**: Analyze customer touchpoints and conversion flow
6. **Analytics**: Compare attribution models and channel performance
7. **AI Insights**: Review AI-powered recommendations
8. **Fraud Detection**: Monitor alerts and block suspicious activity
9. **Settings**: Configure your profile, security, and integrations

## 📁 Project Structure

```
adwise-marketing-system/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.js          # Main layout with sidebar and top nav
│   │   ├── Card.js            # Reusable card component
│   │   ├── StatCard.js        # Statistics card with icon
│   │   └── Modal.js           # Modal dialog component
│   ├── pages/
│   │   ├── Login.js           # Login page
│   │   ├── Signup.js          # Signup page
│   │   ├── Dashboard.js       # Main dashboard with charts
│   │   ├── Campaigns.js       # Campaign management
│   │   ├── TrackingLinks.js   # UTM link generator
│   │   ├── CustomerJourney.js # Customer flow visualization
│   │   ├── Analytics.js       # Attribution and analytics
│   │   ├── AIRecommendations.js # AI insights
│   │   ├── FraudDetection.js  # Fraud monitoring
│   │   └── Settings.js        # User settings
│   ├── App.js                 # Main app component with routing
│   ├── index.js               # Entry point
│   └── index.css              # Global styles with Tailwind
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#0ea5e9` (Tailwind: primary-500)
- **Purple**: `#a855f7` (Tailwind: purple-500)
- **Background**: `#f9fafb` (Tailwind: gray-50)
- **White**: `#ffffff`

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Tables**: Clean design with hover states
- **Charts**: Interactive with tooltips and legends
- **Modals**: Centered with backdrop overlay

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation item in `src/components/Layout.js`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📝 Notes

- This is a demo application with mock data
- Authentication is simplified (no backend integration)
- Charts use sample data for demonstration
- In production, connect to real APIs for data

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ using React and Tailwind CSS
