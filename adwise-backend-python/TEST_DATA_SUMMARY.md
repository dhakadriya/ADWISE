# 🧪 Test Data Summary

## ✅ Successfully Added to Database

### 👤 Test Users (3)

| Name | Email | Password |
|------|-------|----------|
| John Doe | john@example.com | password123 |
| Jane Smith | jane@example.com | password123 |
| Marketing Manager | marketing@adwise.com | admin123 |

---

### 📊 Test Campaigns (10)

| ID | Campaign Name | Channel | Budget | Status | Conversions |
|----|---------------|---------|--------|--------|-------------|
| 1 | Summer Sale 2026 | Google Ads | $15,000 | ACTIVE | 450 |
| 2 | Product Launch Campaign | Facebook | $12,000 | ACTIVE | 380 |
| 3 | Holiday Special Promo | Instagram | $8,500 | PAUSED | 220 |
| 4 | Email Newsletter Campaign | Email | $5,000 | ACTIVE | 150 |
| 5 | Brand Awareness Drive | LinkedIn | $10,000 | ACTIVE | 95 |
| 6 | Retargeting Campaign | Google Ads | $7,500 | ACTIVE | 280 |
| 7 | Influencer Partnership | Instagram | $20,000 | ACTIVE | 520 |
| 8 | Black Friday Preview | Facebook | $18,000 | PAUSED | 0 |
| 9 | Customer Referral Program | Email | $3,000 | ACTIVE | 180 |
| 10 | Mobile App Launch | Google Ads | $25,000 | ACTIVE | 650 |

**Total Budget**: $124,000.00  
**Total Conversions**: 2,925

---

### 🔗 Test Tracking Links (10)

| ID | Link Name | Source | Medium | Campaign |
|----|-----------|--------|--------|----------|
| 1 | Summer Sale - Google Search | google | cpc | summer_sale_2026 |
| 2 | Product Launch - Facebook Post | facebook | social | product_launch |
| 3 | Holiday Promo - Instagram Story | instagram | social | holiday_special |
| 4 | Newsletter - May Edition | newsletter | email | may_newsletter |
| 5 | LinkedIn - Brand Awareness | linkedin | social | brand_awareness |
| 6 | Retargeting - Display Ads | google | display | retargeting |
| 7 | Influencer - Instagram Bio Link | instagram | influencer | influencer_partnership |
| 8 | Email - Referral Program | email | referral | customer_referral |
| 9 | Mobile App - Push Notification | google | app | mobile_app_launch |
| 10 | YouTube - Video Ad | youtube | video | summer_sale_2026 |

---

## 📊 Dashboard Metrics (Calculated)

Based on the test data, your dashboard will show:

- **Total Campaigns**: 10
- **Total Conversions**: 2,925
- **Total Revenue**: $124,000.00
- **Customer Acquisition Cost (CAC)**: $42.39

### Channel Distribution:
- **Google Ads**: 1,380 conversions (47.2%)
- **Instagram**: 740 conversions (25.3%)
- **Facebook**: 380 conversions (13.0%)
- **Email**: 330 conversions (11.3%)
- **LinkedIn**: 95 conversions (3.2%)

### Top 5 Campaigns:
1. Mobile App Launch - 650 conversions
2. Influencer Partnership - 520 conversions
3. Summer Sale 2026 - 450 conversions
4. Product Launch Campaign - 380 conversions
5. Retargeting Campaign - 280 conversions

---

## 🎯 How to Use This Data

### 1. Login to the App
Visit: http://localhost:3000/login

Use any of these credentials:
- **Email**: john@example.com | **Password**: password123
- **Email**: jane@example.com | **Password**: password123
- **Email**: marketing@adwise.com | **Password**: admin123

### 2. View in DB Browser
The database file is located at: `adwise-backend-python/adwise.db`

Open it in DB Browser for SQLite to:
- View all tables
- Edit data directly
- Run SQL queries
- Export data

### 3. Test the API
Visit: http://localhost:8000/docs

Try these endpoints:
- `GET /api/campaigns` - View all campaigns
- `GET /api/tracking-links` - View all tracking links
- `GET /api/analytics/dashboard` - View calculated metrics

---

## 🔄 Re-run Test Data

To add more test data or reset:

```bash
cd adwise-backend-python
python add_test_data.py
```

To clear and start fresh, edit `add_test_data.py` and uncomment:
```python
clear_database()
```

---

## 📝 Notes

- All data is stored in SQLite database (`adwise.db`)
- Data persists between server restarts
- You can edit data directly in DB Browser
- Frontend will automatically display the data
- Dashboard metrics are calculated in real-time

---

## ✅ Verification Checklist

- [x] Database created successfully
- [x] 3 test users added
- [x] 10 campaigns added
- [x] 10 tracking links added
- [x] Backend running on port 8000
- [x] Frontend running on port 3000
- [x] DB Browser opened with database
- [x] All data visible in app

---

**Status**: ✅ Test data successfully added!  
**Database**: `adwise.db` (SQLite)  
**Total Records**: 23 (3 users + 10 campaigns + 10 links)
