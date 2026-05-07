# 🗄️ Database Guide - Adwise Marketing System

## 📊 Current Setup

**Database Type**: SQLite  
**Database File**: `adwise-backend-python/adwise.db`  
**Backend**: Using `main_sqlite.py` (SQLite version)

---

## 🎯 Quick Access

### 1. View in DB Browser for SQLite
```bash
# Open DB Browser with the database
"C:\Program Files\DB Browser for SQLite\DB Browser for SQLite.exe" adwise-backend-python\adwise.db
```

### 2. View in Terminal
```bash
cd adwise-backend-python

# View all data
python view_database.py all

# View specific tables
python view_database.py users
python view_database.py campaigns
python view_database.py links
python view_database.py analytics

# Interactive menu
python view_database.py
```

### 3. View in Browser (API Docs)
```
http://localhost:8000/docs
```

### 4. View in Frontend App
```
http://localhost:3000
```

---

## 📋 Database Schema

### **users** Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### **campaigns** Table
```sql
CREATE TABLE campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    channel TEXT DEFAULT 'General',
    budget REAL NOT NULL,
    status TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    conversions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### **tracking_links** Table
```sql
CREATE TABLE tracking_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    utm_source TEXT NOT NULL,
    utm_medium TEXT NOT NULL,
    utm_campaign TEXT NOT NULL,
    utm_term TEXT,
    utm_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

---

## 🔧 Useful Commands

### Add Test Data
```bash
cd adwise-backend-python
python add_test_data.py
```

This adds:
- 3 test users
- 10 sample campaigns
- 10 tracking links

### Clear Database
Edit `add_test_data.py` and uncomment:
```python
clear_database()
```
Then run:
```bash
python add_test_data.py
```

### View Database Stats
```bash
python view_database.py analytics
```

---

## 🔐 Test User Credentials

| Email | Password | Name |
|-------|----------|------|
| john@example.com | password123 | John Doe |
| jane@example.com | password123 | Jane Smith |
| marketing@adwise.com | admin123 | Marketing Manager |

---

## 📊 Current Data Summary

**Users**: 4  
**Campaigns**: 10  
**Tracking Links**: 10  
**Total Budget**: $129,000  
**Total Conversions**: 2,475  
**CAC**: $52.12

### Top Campaigns:
1. Mobile App Launch - 650 conversions
2. Influencer Partnership - 520 conversions
3. Product Launch Campaign - 380 conversions
4. Retargeting Campaign - 280 conversions
5. Holiday Special Promo - 220 conversions

### Channel Performance:
- **Google Ads**: 930 conversions (37.6%)
- **Instagram**: 740 conversions (29.9%)
- **Facebook**: 380 conversions (15.4%)
- **Email**: 330 conversions (13.3%)
- **LinkedIn**: 95 conversions (3.8%)

---

## 🛠️ SQL Queries

### View All Campaigns
```sql
SELECT * FROM campaigns ORDER BY conversions DESC;
```

### View Active Campaigns
```sql
SELECT * FROM campaigns WHERE status = 'ACTIVE';
```

### Total Budget by Channel
```sql
SELECT channel, SUM(budget) as total_budget, SUM(conversions) as total_conversions
FROM campaigns
GROUP BY channel
ORDER BY total_conversions DESC;
```

### Top 5 Campaigns
```sql
SELECT name, channel, budget, conversions
FROM campaigns
ORDER BY conversions DESC
LIMIT 5;
```

### All Tracking Links for a Campaign
```sql
SELECT * FROM tracking_links
WHERE utm_campaign = 'summer_sale_2026';
```

---

## 🔄 Switching Between Backends

### Use SQLite Backend (Current)
```bash
cd adwise-backend-python
python main_sqlite.py
```

### Use In-Memory Backend (Original)
```bash
cd adwise-backend-python
python main.py
```

**Note**: In-memory backend loses data on restart. SQLite persists data.

---

## 📁 File Locations

```
adwise-backend-python/
├── adwise.db                 # SQLite database file
├── main.py                   # Original in-memory backend
├── main_sqlite.py            # SQLite backend (current)
├── add_test_data.py          # Test data generator
├── view_database.py          # Database viewer
└── TEST_DATA_SUMMARY.md      # Test data documentation
```

---

## 🎯 Common Tasks

### 1. Add a New Campaign via SQL
```sql
INSERT INTO campaigns (name, channel, budget, status, start_date, end_date, conversions)
VALUES ('New Campaign', 'Google Ads', 10000.00, 'ACTIVE', '2026-06-01', '2026-08-31', 0);
```

### 2. Update Campaign Conversions
```sql
UPDATE campaigns
SET conversions = 500
WHERE id = 1;
```

### 3. Delete a Campaign
```sql
DELETE FROM campaigns WHERE id = 1;
```

### 4. Add a New User
```python
import hashlib
password = "mypassword"
hashed = hashlib.sha256(password.encode()).hexdigest()
# Then insert with hashed password
```

---

## 🔍 Troubleshooting

### Database Locked Error
- Close DB Browser before running scripts
- Only one connection can write at a time

### Can't See New Data
- Refresh DB Browser (F5)
- Reload the frontend page
- Check if backend is running

### Lost Data
- SQLite persists data between restarts
- Check if you're using the correct backend (main_sqlite.py)
- Verify database file exists: `adwise.db`

---

## ✅ Best Practices

1. **Backup Database**: Copy `adwise.db` before major changes
2. **Use Transactions**: For multiple related changes
3. **Close Connections**: Always close DB connections after use
4. **Test Queries**: Test in DB Browser before using in code
5. **Regular Backups**: Keep copies of your database

---

## 📚 Resources

- **SQLite Documentation**: https://www.sqlite.org/docs.html
- **DB Browser**: https://sqlitebrowser.org/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Python sqlite3**: https://docs.python.org/3/library/sqlite3.html

---

**Last Updated**: May 5, 2026  
**Database Version**: SQLite 3  
**Status**: ✅ Operational
