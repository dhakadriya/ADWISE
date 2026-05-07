"""
Database Viewer for Adwise Marketing System
View all data in the SQLite database in a formatted way
"""

import sqlite3
from datetime import datetime

DATABASE_NAME = "adwise.db"

def print_header(title):
    """Print a formatted header"""
    print("\n" + "=" * 80)
    print(f"  {title}")
    print("=" * 80)

def view_users():
    """Display all users"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users ORDER BY created_at DESC")
    users = cursor.fetchall()
    conn.close()
    
    print_header("👤 USERS")
    
    if not users:
        print("  No users found.")
        return
    
    print(f"\n  Total Users: {len(users)}\n")
    print(f"  {'ID':<5} {'Name':<25} {'Email':<30} {'Created At':<20}")
    print("  " + "-" * 80)
    
    for user in users:
        created = user['created_at'][:19] if user['created_at'] else 'N/A'
        print(f"  {user['id']:<5} {user['name']:<25} {user['email']:<30} {created:<20}")

def view_campaigns():
    """Display all campaigns"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM campaigns ORDER BY created_at DESC")
    campaigns = cursor.fetchall()
    conn.close()
    
    print_header("📊 CAMPAIGNS")
    
    if not campaigns:
        print("  No campaigns found.")
        return
    
    # Calculate totals
    total_budget = sum(c['budget'] for c in campaigns)
    total_conversions = sum(c['conversions'] for c in campaigns)
    active_count = sum(1 for c in campaigns if c['status'] == 'ACTIVE')
    
    print(f"\n  Total Campaigns: {len(campaigns)}")
    print(f"  Active Campaigns: {active_count}")
    print(f"  Total Budget: ${total_budget:,.2f}")
    print(f"  Total Conversions: {total_conversions:,}\n")
    
    print(f"  {'ID':<4} {'Name':<30} {'Channel':<15} {'Budget':<12} {'Status':<8} {'Conv.':<6}")
    print("  " + "-" * 80)
    
    for campaign in campaigns:
        print(f"  {campaign['id']:<4} {campaign['name']:<30} {campaign['channel']:<15} "
              f"${campaign['budget']:>10,.2f} {campaign['status']:<8} {campaign['conversions']:<6}")

def view_tracking_links():
    """Display all tracking links"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM tracking_links ORDER BY created_at DESC")
    links = cursor.fetchall()
    conn.close()
    
    print_header("🔗 TRACKING LINKS")
    
    if not links:
        print("  No tracking links found.")
        return
    
    print(f"\n  Total Links: {len(links)}\n")
    print(f"  {'ID':<4} {'Name':<35} {'Source':<12} {'Medium':<12} {'Campaign':<20}")
    print("  " + "-" * 80)
    
    for link in links:
        print(f"  {link['id']:<4} {link['name']:<35} {link['utm_source']:<12} "
              f"{link['utm_medium']:<12} {link['utm_campaign']:<20}")

def view_analytics():
    """Display analytics summary"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get campaigns
    cursor.execute("SELECT * FROM campaigns")
    campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    print_header("📈 ANALYTICS SUMMARY")
    
    if not campaigns:
        print("  No data available for analytics.")
        return
    
    # Calculate metrics
    total_campaigns = len(campaigns)
    total_conversions = sum(c.get('conversions', 0) for c in campaigns)
    total_revenue = sum(c.get('budget', 0) for c in campaigns)
    cac = total_revenue / total_conversions if total_conversions > 0 else 0
    
    # Channel breakdown
    channel_stats = {}
    for campaign in campaigns:
        channel = campaign.get('channel', 'General')
        if channel not in channel_stats:
            channel_stats[channel] = {'conversions': 0, 'budget': 0, 'campaigns': 0}
        channel_stats[channel]['conversions'] += campaign.get('conversions', 0)
        channel_stats[channel]['budget'] += campaign.get('budget', 0)
        channel_stats[channel]['campaigns'] += 1
    
    print(f"\n  📊 Overall Metrics:")
    print(f"     Total Campaigns: {total_campaigns}")
    print(f"     Total Conversions: {total_conversions:,}")
    print(f"     Total Revenue: ${total_revenue:,.2f}")
    print(f"     Customer Acquisition Cost: ${cac:.2f}")
    
    print(f"\n  📺 Channel Performance:")
    print(f"     {'Channel':<15} {'Campaigns':<12} {'Conversions':<15} {'Budget':<15} {'Avg Conv.':<10}")
    print("     " + "-" * 70)
    
    for channel, stats in sorted(channel_stats.items(), key=lambda x: x[1]['conversions'], reverse=True):
        avg_conv = stats['conversions'] / stats['campaigns'] if stats['campaigns'] > 0 else 0
        print(f"     {channel:<15} {stats['campaigns']:<12} {stats['conversions']:<15,} "
              f"${stats['budget']:<14,.2f} {avg_conv:<10.1f}")
    
    # Top campaigns
    top_campaigns = sorted(campaigns, key=lambda x: x.get('conversions', 0), reverse=True)[:5]
    
    print(f"\n  🏆 Top 5 Campaigns by Conversions:")
    print(f"     {'Rank':<6} {'Name':<35} {'Conversions':<12} {'Budget':<12}")
    print("     " + "-" * 70)
    
    for i, campaign in enumerate(top_campaigns, 1):
        print(f"     {i:<6} {campaign['name']:<35} {campaign['conversions']:<12,} ${campaign['budget']:<11,.2f}")

def view_all():
    """Display all database information"""
    print("\n" + "=" * 80)
    print("  🗄️  ADWISE DATABASE VIEWER")
    print("=" * 80)
    
    view_users()
    view_campaigns()
    view_tracking_links()
    view_analytics()
    
    print("\n" + "=" * 80)
    print("  ✅ Database view complete!")
    print("=" * 80)
    print()

def interactive_menu():
    """Interactive menu for viewing database"""
    while True:
        print("\n" + "=" * 80)
        print("  🗄️  ADWISE DATABASE VIEWER - MENU")
        print("=" * 80)
        print("\n  1. View Users")
        print("  2. View Campaigns")
        print("  3. View Tracking Links")
        print("  4. View Analytics Summary")
        print("  5. View All")
        print("  6. Exit")
        print()
        
        choice = input("  Select an option (1-6): ").strip()
        
        if choice == '1':
            view_users()
        elif choice == '2':
            view_campaigns()
        elif choice == '3':
            view_tracking_links()
        elif choice == '4':
            view_analytics()
        elif choice == '5':
            view_all()
        elif choice == '6':
            print("\n  👋 Goodbye!\n")
            break
        else:
            print("\n  ❌ Invalid option. Please try again.")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        option = sys.argv[1].lower()
        if option == 'users':
            view_users()
        elif option == 'campaigns':
            view_campaigns()
        elif option == 'links':
            view_tracking_links()
        elif option == 'analytics':
            view_analytics()
        else:
            view_all()
    else:
        # Interactive menu
        interactive_menu()
