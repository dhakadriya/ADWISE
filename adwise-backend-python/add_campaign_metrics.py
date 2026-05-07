"""
Add detailed metrics to all campaigns
Generates realistic performance data for each campaign
"""

import sqlite3
import random

DATABASE_NAME = "adwise.db"

def generate_campaign_metrics(campaign):
    """Generate realistic metrics based on campaign budget and conversions"""
    
    budget = campaign['budget']
    conversions = campaign['conversions']
    
    # Calculate impressions based on budget (higher budget = more impressions)
    impressions = int(budget * random.uniform(3, 5))
    
    # Calculate clicks (CTR typically 1-3%)
    ctr = random.uniform(1.5, 3.5)
    clicks = int(impressions * (ctr / 100))
    
    # Calculate CPC (Cost Per Click)
    cpc = budget / clicks if clicks > 0 else 0
    
    # Calculate conversion rate (typically 3-8%)
    conversion_rate = (conversions / clicks * 100) if clicks > 0 else 0
    
    # Calculate ROI (Return on Investment)
    # Assuming average order value
    avg_order_value = random.uniform(500, 2000)
    revenue = conversions * avg_order_value
    roi = ((revenue - budget) / budget * 100) if budget > 0 else 0
    
    # Calculate ROAS (Return on Ad Spend)
    roas = revenue / budget if budget > 0 else 0
    
    # Calculate ACOS (Advertising Cost of Sales) - for Amazon campaigns
    acos = (budget / revenue * 100) if revenue > 0 else 0
    
    # Calculate CPA (Cost Per Acquisition)
    cpa = budget / conversions if conversions > 0 else 0
    
    return {
        'impressions': impressions,
        'clicks': clicks,
        'ctr': round(ctr, 2),
        'cpc': round(cpc, 2),
        'conversion_rate': round(conversion_rate, 2),
        'roi': round(roi, 2),
        'roas': round(roas, 2),
        'acos': round(acos, 2),
        'cpa': round(cpa, 2),
        'revenue': round(revenue, 2),
        'avg_order_value': round(avg_order_value, 2)
    }

def update_database_schema():
    """Add new columns to campaigns table for metrics"""
    
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    # Add new columns if they don't exist
    new_columns = [
        ('impressions', 'INTEGER DEFAULT 0'),
        ('clicks', 'INTEGER DEFAULT 0'),
        ('ctr', 'REAL DEFAULT 0'),
        ('cpc', 'REAL DEFAULT 0'),
        ('conversion_rate', 'REAL DEFAULT 0'),
        ('roi', 'REAL DEFAULT 0'),
        ('roas', 'REAL DEFAULT 0'),
        ('acos', 'REAL DEFAULT 0'),
        ('cpa', 'REAL DEFAULT 0'),
        ('revenue', 'REAL DEFAULT 0'),
        ('avg_order_value', 'REAL DEFAULT 0')
    ]
    
    print("\n" + "=" * 80)
    print("  📊 UPDATING DATABASE SCHEMA")
    print("=" * 80)
    print()
    
    for column_name, column_type in new_columns:
        try:
            cursor.execute(f"ALTER TABLE campaigns ADD COLUMN {column_name} {column_type}")
            print(f"  ✅ Added column: {column_name}")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print(f"  ⚠️  Column already exists: {column_name}")
            else:
                print(f"  ❌ Error adding {column_name}: {e}")
    
    conn.commit()
    conn.close()
    print()

def add_metrics_to_campaigns():
    """Add detailed metrics to all existing campaigns"""
    
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get all campaigns
    cursor.execute("SELECT * FROM campaigns")
    campaigns = [dict(row) for row in cursor.fetchall()]
    
    print("=" * 80)
    print("  📈 GENERATING CAMPAIGN METRICS")
    print("=" * 80)
    print()
    
    for campaign in campaigns:
        metrics = generate_campaign_metrics(campaign)
        
        # Update campaign with metrics
        cursor.execute("""
            UPDATE campaigns 
            SET impressions = ?,
                clicks = ?,
                ctr = ?,
                cpc = ?,
                conversion_rate = ?,
                roi = ?,
                roas = ?,
                acos = ?,
                cpa = ?,
                revenue = ?,
                avg_order_value = ?
            WHERE id = ?
        """, (
            metrics['impressions'],
            metrics['clicks'],
            metrics['ctr'],
            metrics['cpc'],
            metrics['conversion_rate'],
            metrics['roi'],
            metrics['roas'],
            metrics['acos'],
            metrics['cpa'],
            metrics['revenue'],
            metrics['avg_order_value'],
            campaign['id']
        ))
        
        print(f"  ✅ {campaign['name']}")
        print(f"     Impressions: {metrics['impressions']:,}")
        print(f"     Clicks: {metrics['clicks']:,}")
        print(f"     CTR: {metrics['ctr']}%")
        print(f"     CPC: ₹{metrics['cpc']}")
        print(f"     Conversion Rate: {metrics['conversion_rate']}%")
        print(f"     ROI: {metrics['roi']}%")
        print(f"     ROAS: {metrics['roas']}x")
        print(f"     ACOS: {metrics['acos']}%")
        print(f"     CPA: ₹{metrics['cpa']}")
        print(f"     Revenue: ₹{metrics['revenue']:,.2f}")
        print()
    
    conn.commit()
    conn.close()
    
    print("=" * 80)
    print(f"  ✅ Successfully added metrics to {len(campaigns)} campaigns!")
    print("=" * 80)
    print()

def show_summary():
    """Show summary of all campaigns with metrics"""
    
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM campaigns ORDER BY roi DESC")
    campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    print("=" * 80)
    print("  📊 CAMPAIGN PERFORMANCE SUMMARY")
    print("=" * 80)
    print()
    
    total_budget = sum(c['budget'] for c in campaigns)
    total_revenue = sum(c.get('revenue', 0) for c in campaigns)
    total_conversions = sum(c['conversions'] for c in campaigns)
    total_impressions = sum(c.get('impressions', 0) for c in campaigns)
    total_clicks = sum(c.get('clicks', 0) for c in campaigns)
    
    print(f"  Total Campaigns: {len(campaigns)}")
    print(f"  Total Budget: ₹{total_budget:,.2f}")
    print(f"  Total Revenue: ₹{total_revenue:,.2f}")
    print(f"  Total Conversions: {total_conversions:,}")
    print(f"  Total Impressions: {total_impressions:,}")
    print(f"  Total Clicks: {total_clicks:,}")
    print(f"  Overall ROI: {((total_revenue - total_budget) / total_budget * 100):.2f}%")
    print()
    
    print("  Top 5 Campaigns by ROI:")
    print("  " + "-" * 78)
    for i, campaign in enumerate(campaigns[:5], 1):
        print(f"  {i}. {campaign['name']}")
        print(f"     ROI: {campaign.get('roi', 0):.2f}% | ROAS: {campaign.get('roas', 0):.2f}x | Conversions: {campaign['conversions']}")
    
    print()
    print("=" * 80)

if __name__ == "__main__":
    print("\n" + "=" * 80)
    print("  🚀 CAMPAIGN METRICS GENERATOR")
    print("=" * 80)
    print()
    
    # Update schema
    update_database_schema()
    
    # Add metrics to campaigns
    add_metrics_to_campaigns()
    
    # Show summary
    show_summary()
    
    print("  ✅ All campaigns now have detailed metrics!")
    print("  🌐 Visit http://localhost:3000/campaigns to see the data")
    print()
