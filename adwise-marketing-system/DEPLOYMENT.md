# Deployment Guide - Adwise Marketing System

## 🚀 Deployment Options

### Option 1: Netlify (Recommended for Beginners)

#### Method A: Deploy via Git

1. **Push to GitHub**
```bash
cd adwise-marketing-system
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Choose GitHub and select your repository
- Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `build`
- Click "Deploy site"

#### Method B: Drag and Drop

1. **Build the project**
```bash
npm run build
```

2. **Deploy**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `build` folder to Netlify

---

### Option 2: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd adwise-marketing-system
vercel
```

3. **Follow prompts**
- Set up and deploy: Yes
- Which scope: Your account
- Link to existing project: No
- Project name: adwise-marketing-system
- Directory: ./
- Override settings: No

4. **Production deployment**
```bash
vercel --prod
```

---

### Option 3: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
Add these lines:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/adwise-marketing-system",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

---

### Option 4: AWS S3 + CloudFront

1. **Build the project**
```bash
npm run build
```

2. **Create S3 bucket**
- Go to AWS S3 Console
- Create bucket with public access
- Enable static website hosting

3. **Upload files**
```bash
aws s3 sync build/ s3://your-bucket-name --acl public-read
```

4. **Set up CloudFront** (optional)
- Create CloudFront distribution
- Point to S3 bucket
- Configure SSL certificate

---

### Option 5: Docker

1. **Create Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Build and run**
```bash
docker build -t adwise-marketing-system .
docker run -p 80:80 adwise-marketing-system
```

---

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
Create `.env` file for production:
```env
REACT_APP_API_URL=https://api.yourbackend.com
REACT_APP_ENV=production
```

### 2. Update API Endpoints
Replace mock data with real API calls:
```javascript
// Before (mock data)
const [campaigns, setCampaigns] = useState([...mockData]);

// After (API call)
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/campaigns`)
    .then(res => res.json())
    .then(data => setCampaigns(data));
}, []);
```

### 3. Add Authentication
Implement real authentication:
```javascript
// Example with JWT
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { token } = await response.json();
  localStorage.setItem('token', token);
  setIsAuthenticated(true);
};
```

### 4. Optimize Build
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer

# Add to package.json scripts
"analyze": "source-map-explorer 'build/static/js/*.js'"

# Run analysis
npm run build
npm run analyze
```

### 5. Add Error Tracking
```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.REACT_APP_ENV,
});
```

### 6. Add Analytics
```javascript
// Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR_GA_MEASUREMENT_ID');
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different keys for dev/prod
- Store secrets in deployment platform

### 2. HTTPS
- Always use HTTPS in production
- Most platforms (Netlify, Vercel) provide free SSL

### 3. Content Security Policy
Add to `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### 4. API Security
- Use CORS properly
- Implement rate limiting
- Validate all inputs
- Use JWT for authentication

---

## 📊 Performance Optimization

### 1. Code Splitting
```javascript
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Campaigns = lazy(() => import('./pages/Campaigns'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Image Optimization
- Use WebP format
- Implement lazy loading
- Compress images

### 3. Caching
Add to `public/index.html`:
```html
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

---

## 🧪 Testing Before Deployment

### 1. Build Test
```bash
npm run build
npx serve -s build
```
Visit `http://localhost:3000` to test production build

### 2. Lighthouse Audit
- Open Chrome DevTools
- Go to Lighthouse tab
- Run audit
- Fix issues

### 3. Cross-Browser Testing
Test on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

### 4. Responsive Testing
Test breakpoints:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --watchAll=false
    
    - name: Build
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.API_URL }}
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      with:
        args: deploy --prod --dir=build
```

---

## 📝 Post-Deployment

### 1. Monitor Performance
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor error rates (Sentry)
- Track user analytics (Google Analytics)

### 2. Set Up Backups
- Regular database backups
- Version control for code
- Document deployment process

### 3. Custom Domain
Most platforms support custom domains:
- Add DNS records
- Configure SSL
- Set up redirects

### 4. SEO Optimization
```html
<!-- public/index.html -->
<meta name="description" content="Adwise Marketing System - Unified marketing attribution and analytics platform">
<meta name="keywords" content="marketing, analytics, attribution, campaigns">
<meta property="og:title" content="Adwise Marketing System">
<meta property="og:description" content="Unified marketing attribution and analytics">
<meta property="og:image" content="%PUBLIC_URL%/og-image.jpg">
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (404 on refresh)
Add `_redirects` file to `public/`:
```
/*    /index.html   200
```

### Environment Variables Not Working
- Prefix with `REACT_APP_`
- Restart dev server after changes
- Check deployment platform settings

---

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **React Deployment**: https://create-react-app.dev/docs/deployment
- **AWS S3 Hosting**: https://docs.aws.amazon.com/s3/

---

## ✅ Deployment Checklist

- [ ] Code is tested and working locally
- [ ] Production build succeeds
- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Authentication implemented
- [ ] Error tracking set up
- [ ] Analytics configured
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] SEO meta tags added
- [ ] Performance optimized
- [ ] Cross-browser tested
- [ ] Mobile responsive verified
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

**Your Adwise Marketing System is ready for deployment! 🚀**

Choose the deployment option that best fits your needs and follow the steps above. Good luck!
