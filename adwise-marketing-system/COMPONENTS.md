# Component Documentation

## 📦 Reusable Components

### Card Component
**Location**: `src/components/Card.js`

A versatile card container with optional hover effects.

**Props**:
- `children` (ReactNode): Content to display inside the card
- `className` (string): Additional CSS classes
- `hover` (boolean): Enable hover shadow effect

**Usage**:
```jsx
import Card from '../components/Card';

<Card className="p-6" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

---

### StatCard Component
**Location**: `src/components/StatCard.js`

Display key metrics with icons and trend indicators.

**Props**:
- `title` (string): Metric name
- `value` (string): Metric value
- `change` (string): Percentage change (optional)
- `icon` (Component): Lucide icon component
- `trend` (string): 'up' or 'down' for trend direction

**Usage**:
```jsx
import StatCard from '../components/StatCard';
import { TrendingUp } from 'lucide-react';

<StatCard
  title="Total Revenue"
  value="$45,231"
  change="+23%"
  trend="up"
  icon={TrendingUp}
/>
```

---

### Modal Component
**Location**: `src/components/Modal.js`

A centered modal dialog with backdrop overlay.

**Props**:
- `isOpen` (boolean): Control modal visibility
- `onClose` (function): Callback when modal closes
- `title` (string): Modal header title
- `children` (ReactNode): Modal content

**Usage**:
```jsx
import Modal from '../components/Modal';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  title="Create New Item"
>
  <form>
    {/* Form content */}
  </form>
</Modal>
```

---

### Layout Component
**Location**: `src/components/Layout.js`

Main application layout with sidebar navigation and top bar.

**Features**:
- Responsive sidebar (collapsible on mobile)
- Top navigation bar with search and notifications
- Active route highlighting
- User avatar dropdown

**Usage**:
```jsx
import Layout from '../components/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

**Navigation Items**:
Edit the `navigation` array in Layout.js to add/remove menu items:
```javascript
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'New Page', href: '/new-page', icon: YourIcon },
];
```

---

## 📊 Chart Components (Recharts)

### Line Chart
Used in Dashboard for performance over time.

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" />
  </LineChart>
</ResponsiveContainer>
```

### Pie Chart
Used in Dashboard for channel contribution.

```jsx
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

<PieChart>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    outerRadius={100}
    fill="#8884d8"
    dataKey="value"
    label
  >
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Pie>
  <Tooltip />
</PieChart>
```

### Bar Chart
Used in Dashboard and Analytics for comparisons.

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

<BarChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="conversions" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
</BarChart>
```

---

## 🎨 Styling Patterns

### Gradient Buttons
```jsx
<button className="px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all">
  Click Me
</button>
```

### Status Badges
```jsx
<span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
  Active
</span>
```

### Input Fields
```jsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="Enter text"
/>
```

### Toggle Switch
```jsx
<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
</label>
```

### Hover Cards
```jsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
  Content
</div>
```

---

## 🔧 Common Patterns

### Table with Actions
```jsx
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
        Name
      </th>
      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">Data</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button className="text-primary-600 hover:text-primary-900">
          Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

### Form with Validation
```jsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Field Name
    </label>
    <input
      type="text"
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
    />
  </div>
  <button type="submit" className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg">
    Submit
  </button>
</form>
```

### Alert/Notification
```jsx
<div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
  <div className="flex items-center">
    <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
    <div>
      <h4 className="font-semibold text-red-900">Alert Title</h4>
      <p className="text-sm text-red-700">Alert message goes here</p>
    </div>
  </div>
</div>
```

---

## 🎯 Icon Usage (Lucide React)

Common icons used throughout the app:

```jsx
import {
  LayoutDashboard,  // Dashboard
  Megaphone,        // Campaigns
  Link2,            // Tracking Links
  Users,            // Customer Journey
  BarChart3,        // Analytics
  Lightbulb,        // AI Insights
  Shield,           // Fraud Detection
  Settings,         // Settings
  TrendingUp,       // Positive trends
  TrendingDown,     // Negative trends
  AlertTriangle,    // Warnings
  CheckCircle,      // Success
  Copy,             // Copy action
  Edit2,            // Edit action
  Trash2,           // Delete action
  Plus,             // Add action
  X,                // Close action
} from 'lucide-react';
```

**Usage**:
```jsx
<TrendingUp className="h-5 w-5 text-green-600" />
```

---

## 📱 Responsive Utilities

### Hide on Mobile
```jsx
<div className="hidden md:block">
  Desktop only content
</div>
```

### Show on Mobile Only
```jsx
<div className="block md:hidden">
  Mobile only content
</div>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Grid items */}
</div>
```

### Responsive Padding
```jsx
<div className="px-4 sm:px-6 md:px-8">
  Content with responsive padding
</div>
```

---

## 🎨 Color Classes

### Primary Colors
- `bg-primary-50` to `bg-primary-900`
- `text-primary-50` to `text-primary-900`
- `border-primary-50` to `border-primary-900`

### Purple Colors
- `bg-purple-50` to `bg-purple-900`
- `text-purple-50` to `text-purple-900`

### Status Colors
- **Success**: `bg-green-100 text-green-800`
- **Warning**: `bg-yellow-100 text-yellow-800`
- **Error**: `bg-red-100 text-red-800`
- **Info**: `bg-blue-100 text-blue-800`

---

## 🔄 State Management Patterns

### Simple State
```jsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });
```

### Form Handling
```jsx
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

### Array State
```jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));

// Update item
setItems(items.map(item => 
  item.id === id ? { ...item, ...updates } : item
));
```

---

## 🚀 Performance Tips

1. **Use ResponsiveContainer** for charts to ensure proper sizing
2. **Memoize expensive calculations** with `useMemo`
3. **Lazy load pages** with `React.lazy()` for code splitting
4. **Optimize images** and use appropriate formats
5. **Minimize re-renders** by using proper key props

---

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
- [React Router Documentation](https://reactrouter.com/)

---

Happy coding! 🎉
