"""
Test Data Generator for Adwise Marketing System
Adds sample campaigns and tracking links to the SQLite database
"""

import sqlite3
from datetime import datetime, timedelta
import random

DATABASE_NAME = "adwise.db"

def add_test_campaigns():
    """Add sample campaigns to the database"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    # Sample campaigns data
    campaigns = [
        {
            "name": "Summer Sale 2026",
            "channel": "Google Ads",
            "budget": 15000.00,
            "status": "ACTIVE",
            "start_date": "2026-06-01",
            "end_date": "2026-08-31",
            "conversions": 450
        },
        {
            "name": "Product Launch Campaign",
            "channel": "Facebook",
            "budget": 12000.00,
            "status": "ACTIVE",
            "start_date": "2026-05-01",
            "end_date": "2026-07-31",
            "conversions": 380
        },
        {
            "name": "Holiday Special Promo",
            "channel": "Instagram",
            "budget": 8500.00,
            "status": "PAUSED",
            "start_date": "2026-04-15",
            "end_date": "2026-06-15",
            "conversions": 220
        },
        {
            "name": "Email Newsletter Campaign",
            "channel": "Email",
            "budget": 5000.00,
            "status": "ACTIVE",
            "start_date": "2026-05-10",
            "end_date": "2026-12-31",
            "conversions": 150
        },
        {
            "name": "Brand Awareness Drive",
            "channel": "LinkedIn",
            "budget": 10000.00,
            "status": "ACTIVE",
            "start_date": "2026-03-01",
            "end_date": "2026-09-30",
            "conversions": 95
        },
        {
            "name": "Retargeting Campaign",
            "channel": "Google Ads",
            "budget": 7500.00,
            "status": "ACTIVE",
            "start_date": "2026-04-01",
            "end_date": "2026-10-31",
            "conversions": 280
        },
        {
            "name": "Influencer Partnership",
            "channel": "Instagram",
            "budget": 20000.00,
            "status": "ACTIVE",
            "start_date": "2026-05-15",
            "end_date": "2026-08-15",
            "conversions": 520
        },
        {
            "name": "Black Friday Preview",
            "channel": "Facebook",
            "budget": 18000.00,
            "status": "PAUSED",
            "start_date": "2026-11-01",
            "end_date": "2026-11-30",
            "conversions": 0
        },
        {
            "name": "Customer Referral Program",
            "channel": "Email",
            "budget": 3000.00,
            "status": "ACTIVE",
            "start_date": "2026-01-01",
            "end_date": "2026-12-31",
            "conversions": 180
        },
        {
            "name": "Mobile App Launch",
            "channel": "Google Ads",
            "budget": 25000.00,
            "status": "ACTIVE",
            "start_date": "2026-05-01",
            "end_date": "2026-07-31",
            "conversions": 650
        }
    ]
    
    print("📊 Adding test campaigns to database...")
    
    for campaign in campaigns:
        cursor.execute(
            """INSERT INTO campaigns (name, channel, budget, status, start_date, end_date, conversions)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (campaign["name"], campaign["channel"], campaign["budget"], campaign["status"],
             campaign["start_date"], campaign["end_date"], campaign["conversions"])
        )
        print(f"  ✅ Added: {campaign['name']} - {campaign['channel']} - ${campaign['budget']:,.2f}")
    
    conn.commit()
    conn.close()
    print(f"\n✅ Successfully added {len(campaigns)} campaigns!\n")

def add_test_tracking_links():
    """Add sample tracking links to the database"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    # Sample tracking links data
    tracking_links = [
        {
            "name": "Summer Sale - Google Search",
            "url": "https://example.com/products",
            "utm_source": "google",
            "utm_medium": "cpc",
            "utm_campaign": "summer_sale_2026",
            "utm_term": "summer deals",
            "utm_content": "text_ad_1"
        },
        {
            "name": "Product Launch - Facebook Post",
            "url": "https://example.com/new-product",
            "utm_source": "facebook",
            "utm_medium": "social",
            "utm_campaign": "product_launch",
            "utm_term": None,
            "utm_content": "carousel_ad"
        },
        {
            "name": "Holiday Promo - Instagram Story",
            "url": "https://example.com/holiday-sale",
            "utm_source": "instagram",
            "utm_medium": "social",
            "utm_campaign": "holiday_special",
            "utm_term": None,
            "utm_content": "story_swipe_up"
        },
        {
            "name": "Newsletter - May Edition",
            "url": "https://example.com/newsletter",
            "utm_source": "newsletter",
            "utm_medium": "email",
            "utm_campaign": "may_newsletter",
            "utm_term": None,
            "utm_content": "header_banner"
        },
        {
            "name": "LinkedIn - Brand Awareness",
            "url": "https://example.com/about",
            "utm_source": "linkedin",
            "utm_medium": "social",
            "utm_campaign": "brand_awareness",
            "utm_term": "b2b marketing",
            "utm_content": "sponsored_post"
        },
        {
            "name": "Retargeting - Display Ads",
            "url": "https://example.com/cart",
            "utm_source": "google",
            "utm_medium": "display",
            "utm_campaign": "retargeting",
            "utm_term": None,
            "utm_content": "banner_300x250"
        },
        {
            "name": "Influencer - Instagram Bio Link",
            "url": "https://example.com/influencer-special",
            "utm_source": "instagram",
            "utm_medium": "influencer",
            "utm_campaign": "influencer_partnership",
            "utm_term": None,
            "utm_content": "bio_link"
        },
        {
            "name": "Email - Referral Program",
            "url": "https://example.com/refer",
            "utm_source": "email",
            "utm_medium": "referral",
            "utm_campaign": "customer_referral",
            "utm_term": None,
            "utm_content": "cta_button"
        },
        {
            "name": "Mobile App - Push Notification",
            "url": "https://example.com/app-download",
            "utm_source": "google",
            "utm_medium": "app",
            "utm_campaign": "mobile_app_launch",
            "utm_term": "app download",
            "utm_content": "push_notification"
        },
        {
            "name": "YouTube - Video Ad",
            "url": "https://example.com/video-promo",
            "utm_source": "youtube",
            "utm_medium": "video",
            "utm_campaign": "summer_sale_2026",
            "utm_term": None,
            "utm_content": "pre_roll_ad"
        }
    ]
    
    print("🔗 Adding test tracking links to database...")
    
    for link in tracking_links:
        cursor.execute(
            """INSERT INTO tracking_links (name, url, utm_source, utm_medium, utm_campaign, utm_term, utm_content)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (link["name"], link["url"], link["utm_source"], link["utm_medium"],
             link["utm_campaign"], link["utm_term"], link["utm_content"])
        )
        print(f"  ✅ Added: {link['name']}")
    
    conn.commit()
    conn.close()
    print(f"\n✅ Successfully added {len(tracking_links)} tracking links!\n")

def add_test_users():
    """Add sample users to the database"""
    import hashlib
    
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    def get_password_hash(password):
        return hashlib.sha256(password.encode()).hexdigest()
    
    # Sample users
    users = [
        {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "password123"
        },
        {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "password": "password123"
        },
        {
            "name": "Marketing Manager",
            "email": "marketing@adwise.com",
            "password": "admin123"
        }
    ]
    
    print("👤 Adding test users to database...")
    
    for user in users:
        try:
            hashed_password = get_password_hash(user["password"])
            cursor.execute(
                "INSERT INTO users (name, email, hashed_password) VALUES (?, ?, ?)",
                (user["name"], user["email"], hashed_password)
            )
            print(f"  ✅ Added: {user['name']} ({user['email']}) - Password: {user['password']}")
        except sqlite3.IntegrityError:
            print(f"  ⚠️  User already exists: {user['email']}")
    
    conn.commit()
    conn.close()
    print(f"\n✅ Test users added!\n")

def show_database_stats():
    """Display database statistics"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    # Count records
    cursor.execute("SELECT COUNT(*) FROM users")
    user_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM campaigns")
    campaign_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM tracking_links")
    link_count = cursor.fetchone()[0]
    
    # Calculate totals
    cursor.execute("SELECT SUM(budget), SUM(conversions) FROM campaigns")
    totals = cursor.fetchone()
    total_budget = totals[0] or 0
    total_conversions = totals[1] or 0
    
    conn.close()
    
    print("=" * 60)
    print("📊 DATABASE STATISTICS")
    print("=" * 60)
    print(f"👤 Users:           {user_count}")
    print(f"📊 Campaigns:       {campaign_count}")
    print(f"🔗 Tracking Links:  {link_count}")
    print(f"💰 Total Budget:    ${total_budget:,.2f}")
    print(f"🎯 Total Conversions: {total_conversions}")
    print("=" * 60)
    print()

def clear_database():
    """Clear all data from database (optional)"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    print("🗑️  Clearing existing data...")
    cursor.execute("DELETE FROM campaigns")
    cursor.execute("DELETE FROM tracking_links")
    cursor.execute("DELETE FROM users")
    
    # Reset auto-increment counters
    cursor.execute("DELETE FROM sqlite_sequence WHERE name='campaigns'")
    cursor.execute("DELETE FROM sqlite_sequence WHERE name='tracking_links'")
    cursor.execute("DELETE FROM sqlite_sequence WHERE name='users'")
    
    conn.commit()
    conn.close()
    print("✅ Database cleared!\n")

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🚀 ADWISE TEST DATA GENERATOR")
    print("=" * 60)
    print()
    
    # Uncomment the line below if you want to clear existing data first
    # clear_database()
    
    # Add test data
    add_test_users()
    add_test_campaigns()
    add_test_tracking_links()
    
    # Show statistics
    show_database_stats()
    
    print("✅ All test data has been added successfully!")
    print("🔍 Open DB Browser for SQLite to view the data")
    print("🌐 Visit http://localhost:3000 to see it in the app")
    print()
