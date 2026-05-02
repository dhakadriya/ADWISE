# Pages Visual Guide

## 📄 Complete Page Breakdown

### 🔐 Authentication Pages

#### Login Page (`/login`)
```
┌─────────────────────────────────────────┐
│                                         │
│              [A] Logo                   │
│         Welcome back                    │
│   Sign in to your Adwise account       │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  📧 Email address                 │ │
│  │  [email input field]              │ │
│  │                                   │ │
│  │  🔒 Password                      │ │
│  │  [password input field]           │ │
│  │                                   │ │
│  │  ☑ Remember me    Forgot password?│ │
│  │                                   │ │
│  │  [Sign in →]                      │ │
│  │                                   │ │
│  │  ─── Or continue with ───         │ │
│  │  [Google] [GitHub]                │ │
│  │                                   │ │
│  │  Don't have an account? Sign up   │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

#### Signup Page (`/signup`)
```
┌─────────────────────────────────────────┐
│                                         │
│              [A] Logo                   │
│       Create your account               │
│      Start your 14-day free trial      │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  👤 Full name                     │ │
│  │  [name input field]               │ │
│  │                                   │ │
│  │  📧 Email address                 │ │
│  │  [email input field]              │ │
│  │                                   │ │
│  │  🔒 Password                      │ │
│  │  [password input field]           │ │
│  │                                   │ │
│  │  ☑ I agree to Terms & Privacy     │ │
│  │                                   │ │
│  │  [Create account →]               │ │
│  │                                   │ │
│  │  Already have an account? Sign in │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

### 📊 Dashboard Page (`/dashboard`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Dashboard                                         │
│         │ Welcome back! Here's what's happening...          │
│ [A]     │                                                   │
│ Adwise  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│         │ │  📢  │ │  📈  │ │  💰  │ │  👥  │            │
│ 📊 Dash │ │  24  │ │ 1,428│ │$45.2K│ │$31.67│            │
│ 📢 Camp │ │ +12% │ │ +18% │ │ +23% │ │  -8% │            │
│ 🔗 Link │ └──────┘ └──────┘ └──────┘ └──────┘            │
│ 👥 Jour │                                                   │
│ 📈 Anal │ ┌─────────────────────┐ ┌─────────────────────┐ │
│ 💡 AI   │ │ Performance Over    │ │ Channel             │ │
│ 🛡️ Frau │ │ Time                │ │ Contribution        │ │
│ ⚙️ Sett │ │                     │ │                     │ │
│         │ │  [Line Chart]       │ │  [Pie Chart]        │ │
│         │ │                     │ │                     │ │
│         │ └─────────────────────┘ └─────────────────────┘ │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Campaign Comparison                           ││
│         │ │                                               ││
│         │ │  [Bar Chart]                                  ││
│         │ │                                               ││
│         │ └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

### 📢 Campaigns Page (`/campaigns`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Campaign Management          [+ Create Campaign] │
│         │ Create and manage your marketing campaigns        │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Campaign Name │ Budget │ Status │ Dates │ ⚙️ ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ Summer Sale   │ $5,000 │ Active │ 04/01 │ ✏️🗑││
│         │ │ Product Launch│ $8,000 │ Active │ 03/15 │ ✏️🗑││
│         │ │ Holiday       │$10,000 │ Paused │ 02/01 │ ✏️🗑││
│         │ │ Brand Aware   │ $3,500 │ Active │ 01/10 │ ✏️🗑││
│         │ └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Modal (Create Campaign):
┌─────────────────────────────┐
│ Create New Campaign      ✕  │
├─────────────────────────────┤
│ Campaign Name:              │
│ [input field]               │
│                             │
│ Budget:                     │
│ [input field]               │
│                             │
│ Start Date:    End Date:    │
│ [date]         [date]       │
│                             │
│      [Cancel] [Create]      │
└─────────────────────────────┘
```

---

### 🔗 Tracking Links Page (`/tracking-links`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Tracking Links               [+ Generate Link]   │
│         │ Generate and manage UTM tracking links            │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ [Google] [CPC] [Summer Sale]                  ││
│         │ │ https://example.com/?utm_source=google&...    ││
│         │ │                                    [📋] [🔗]  ││
│         │ └───────────────────────────────────────────────┘│
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ [Facebook] [Social] [Product Launch]          ││
│         │ │ https://example.com/?utm_source=facebook&...  ││
│         │ │                                    [📋] [🔗]  ││
│         │ └───────────────────────────────────────────────┘│
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ [Email] [Newsletter] [Holiday Special]        ││
│         │ │ https://example.com/?utm_source=email&...     ││
│         │ │                                    [📋] [🔗]  ││
│         │ └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

### 👥 Customer Journey Page (`/customer-journey`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Customer Journey                                  │
│         │ Visualize how customers interact with your brand  │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Journey Flow                                  ││
│         │ │                                               ││
│         │ │  🖱️      🌐      👤      🛒      ✅          ││
│         │ │  Ad    Website  Signup  Add to  Purchase      ││
│         │ │  Click   Visit           Cart                 ││
│         │ │ 5,420   4,230   2,150   1,680   1,428        ││
│         │ │   └─78%─┘ └─51%─┘ └─78%─┘ └─85%─┘           ││
│         │ └───────────────────────────────────────────────┘│
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Recent Customer Touchpoints                   ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ John Doe                           $125       ││
│         │ │ Google Ads → Homepage → Product → Purchase    ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ Jane Smith                         $89        ││
│         │ │ Facebook → Blog → Product → Cart → Purchase   ││
│         │ └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

### 📈 Analytics Page (`/analytics`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Analytics & Attribution                           │
│         │ Understand which channels drive the most value    │
│         │                                                   │
│         │ [First Click] [Last Click] [Multi-Touch]         │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Attribution Model Comparison                  ││
│         │ │                                               ││
│         │ │  [Bar Chart - 3 bars per channel]             ││
│         │ │                                               ││
│         │ └───────────────────────────────────────────────┘│
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Channel Performance                           ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ Channel │ Contrib │ Revenue │ Conv │ ROI     ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ Google  │ ▓▓▓ 32% │ $14,474 │ 456  │ 285%   ││
│         │ │ Facebook│ ▓▓▓ 27% │ $12,212 │ 385  │ 245%   ││
│         │ │ Instagram│▓▓ 19%  │ $8,594  │ 271  │ 198%   ││
│         │ └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

### 💡 AI Recommendations Page (`/ai-insights`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ AI Recommendations                                │
│         │ Data-driven insights to optimize performance      │
│         │                                                   │
│         │ ┌──────┐ ┌──────┐ ┌──────┐                       │
│         │ │  6   │ │$6,000│ │ 89%  │                       │
│         │ │Active│ │Gain  │ │Conf. │                       │
│         │ └──────┘ └──────┘ └──────┘                       │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ 📈 Increase Google Ads Budget      [HIGH]     ││
│         │ │ Your Google Ads campaigns are performing...   ││
│         │ │ Potential: +$4,200/month  Confidence: 92%     ││
│         │ │                                      [Apply →] ││
│         │ └───────────────────────────────────────────────┘│
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ 📉 Reduce Instagram Spend          [MEDIUM]   ││
│         │ │ Instagram campaigns show declining ROI...     ││
│         │ │ Potential: $1,800/month   Confidence: 87%     ││
│         │ │                                      [Apply →] ││
│         │ └───────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

### 🛡️ Fraud Detection Page (`/fraud-detection`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Fraud Detection                                   │
│         │ Monitor and prevent fraudulent activity           │
│         │                                                   │
│         │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│         │ │  12  │ │ 587  │ │$1,761│ │94.2% │            │
│         │ │Alerts│ │Block │ │Saved │ │Rate  │            │
│         │ └──────┘ └──────┘ └──────┘ └──────┘            │
│         │                                                   │
│         │ ┌───────────────────────────────────────────────┐│
│         │ │ Recent Alerts                                 ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ ⚠️ Suspicious Click Pattern [HIGH]            ││
│         │ │ Unusual spike in clicks from IP range...      ││
│         │ │ Affected: 342 clicks  Loss: $1,026           ││
│         │ │                    [Investigate] [Block]      ││
│         │ ├───────────────────────────────────────────────┤│
│         │ │ ⚠️ Abnormal Traffic Source [MEDIUM]           ││
│         │ │ High volume of traffic from unknown...        ││
│         │ │ Affected: 156 clicks  Loss: $468             ││
│         │ │                    [Investigate] [Block]      ││
│         │ └───────────────────────────────────────────────┘│
│         │                                                   │
│         │ ┌──────────────────┐ ┌──────────────────┐       │
│         │ │ Protection Rules │ │ Blocked Sources  │       │
│         │ │ ☑ Block IPs      │ │ 192.168.1.0/24   │       │
│         │ │ ☑ Filter bots    │ │ suspicious-bot   │       │
│         │ │ ☐ Click fraud    │ │                  │       │
│         │ └──────────────────┘ └──────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

### ⚙️ Settings Page (`/settings`)

```
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Settings                                          │
│         │ Manage your account settings and preferences      │
│         │                                                   │
│         │ ┌──────┐ ┌────────────────────────────────────┐  │
│         │ │ 👤   │ │ Profile Information                │  │
│         │ │Prof  │ │                                    │  │
│         │ │      │ │ [Avatar]  [Change Photo]           │  │
│         │ │ 🛡️   │ │                                    │  │
│         │ │Secur │ │ First Name:  [John]                │  │
│         │ │      │ │ Last Name:   [Doe]                 │  │
│         │ │ 🔔   │ │ Email:       [john@example.com]    │  │
│         │ │Notif │ │ Company:     [Acme Inc.]           │  │
│         │ │      │ │                                    │  │
│         │ │ 🌐   │ │                    [Save Changes]  │  │
│         │ │Integ │ └────────────────────────────────────┘  │
│         │ │      │                                         │
│         │ │ 💳   │ Tabs: Profile | Security | Notifications│
│         │ │Bill  │       Integrations | Billing            │
│         │ └──────┘                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Common UI Elements

### Sidebar Navigation
```
┌──────────────┐
│   [A] Logo   │
│   Adwise     │
├──────────────┤
│ 📊 Dashboard │ ← Active (blue bg)
│ 📢 Campaigns │
│ 🔗 Links     │
│ 👥 Journey   │
│ 📈 Analytics │
│ 💡 AI        │
│ 🛡️ Fraud     │
│ ⚙️ Settings  │
└──────────────┘
```

### Top Navigation Bar
```
┌────────────────────────────────────────────────────┐
│ [☰] [🔍 Search...]              [🔔] [👤 Avatar]  │
└────────────────────────────────────────────────────┘
```

### Stat Card
```
┌──────────────────┐
│ Total Campaigns  │
│                  │
│      24      📢  │
│                  │
│ 📈 +12%          │
│ vs last month    │
└──────────────────┘
```

### Table Row
```
┌────────────────────────────────────────────────┐
│ Name │ Budget │ [Active] │ Date │ [✏️] [🗑️] │
└────────────────────────────────────────────────┘
```

### Modal
```
┌─────────────────────────┐
│ Title                ✕  │
├─────────────────────────┤
│                         │
│ [Form content]          │
│                         │
│   [Cancel] [Submit]     │
└─────────────────────────┘
```

---

## 📱 Responsive Behavior

### Desktop (> 1024px)
- Sidebar always visible
- Multi-column layouts
- Full-width charts
- Expanded tables

### Tablet (768px - 1024px)
- Sidebar visible
- 2-column grids
- Responsive charts
- Scrollable tables

### Mobile (< 768px)
- Hamburger menu
- Single column
- Stacked cards
- Horizontal scroll tables

---

## 🎯 Navigation Flow

```
Login/Signup
    ↓
Dashboard (default landing)
    ├→ Campaigns
    ├→ Tracking Links
    ├→ Customer Journey
    ├→ Analytics
    ├→ AI Recommendations
    ├→ Fraud Detection
    └→ Settings
```

---

## 🎨 Color Coding

- **Blue** (#0ea5e9): Primary actions, links, active states
- **Purple** (#a855f7): Secondary accents, gradients
- **Green**: Success, positive trends, active status
- **Yellow**: Warnings, medium priority
- **Red**: Errors, alerts, high priority
- **Gray**: Neutral, backgrounds, disabled states

---

This visual guide helps you understand the layout and structure of each page in the Adwise Marketing System!
