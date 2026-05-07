from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import jwt
import hashlib
import os
import sqlite3
import json

# Initialize FastAPI app
app = FastAPI(
    title="Adwise Marketing System API",
    description="Marketing Attribution and Analytics Platform API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# SQLite Database
DATABASE_NAME = "adwise.db"

# ==================== Database Setup ====================

def init_database():
    """Initialize SQLite database with tables"""
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Campaigns table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS campaigns (
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
    ''')
    
    # Tracking Links table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tracking_links (
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
    ''')
    
    conn.commit()
    conn.close()
    print(f"✅ Database initialized: {DATABASE_NAME}")

# Initialize database on startup
init_database()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# ==================== Models ====================

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Campaign(BaseModel):
    id: Optional[int] = None
    name: str
    channel: Optional[str] = "General"
    budget: float
    status: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    conversions: Optional[int] = 0

class TrackingLink(BaseModel):
    id: Optional[int] = None
    name: str
    url: str
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None

# ==================== Helper Functions ====================

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return get_password_hash(plain_password) == hashed_password

def get_password_hash(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ==================== Authentication Routes ====================

@app.post("/api/auth/register", response_model=Token)
async def register(user: UserRegister):
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if user exists
    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    hashed_password = get_password_hash(user.password)
    cursor.execute(
        "INSERT INTO users (name, email, hashed_password) VALUES (?, ?, ?)",
        (user.name, user.email, hashed_password)
    )
    conn.commit()
    conn.close()
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE email = ?", (form_data.username,))
    user = cursor.fetchone()
    conn.close()
    
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ==================== Campaign Routes ====================

@app.get("/api/campaigns")
async def get_campaigns():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM campaigns ORDER BY created_at DESC")
    campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return campaigns

@app.post("/api/campaigns")
async def create_campaign(campaign: Campaign):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        """INSERT INTO campaigns (name, channel, budget, status, start_date, end_date, conversions)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (campaign.name, campaign.channel, campaign.budget, campaign.status,
         campaign.start_date, campaign.end_date, campaign.conversions or 0)
    )
    
    campaign_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    campaign.id = campaign_id
    return campaign

@app.put("/api/campaigns/{campaign_id}")
async def update_campaign(campaign_id: int, campaign: Campaign):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        """UPDATE campaigns 
           SET name=?, channel=?, budget=?, status=?, start_date=?, end_date=?, conversions=?
           WHERE id=?""",
        (campaign.name, campaign.channel, campaign.budget, campaign.status,
         campaign.start_date, campaign.end_date, campaign.conversions or 0, campaign_id)
    )
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    conn.commit()
    conn.close()
    
    campaign.id = campaign_id
    return campaign

@app.delete("/api/campaigns/{campaign_id}")
async def delete_campaign(campaign_id: int):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM campaigns WHERE id=?", (campaign_id,))
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    conn.commit()
    conn.close()
    
    return {"message": "Campaign deleted"}

# ==================== Tracking Link Routes ====================

@app.get("/api/tracking-links")
async def get_tracking_links():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tracking_links ORDER BY created_at DESC")
    links = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return links

@app.post("/api/tracking-links")
async def create_tracking_link(link: TrackingLink):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        """INSERT INTO tracking_links (name, url, utm_source, utm_medium, utm_campaign, utm_term, utm_content)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (link.name, link.url, link.utm_source, link.utm_medium, link.utm_campaign,
         link.utm_term, link.utm_content)
    )
    
    link_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    link.id = link_id
    return link

# ==================== Analytics Routes ====================

@app.get("/api/analytics/dashboard")
async def get_dashboard_metrics():
    conn = get_db()
    cursor = conn.cursor()
    
    # Get all campaigns
    cursor.execute("SELECT * FROM campaigns")
    campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    # Calculate metrics
    total_campaigns = len(campaigns)
    total_conversions = sum(c.get('conversions', 0) for c in campaigns)
    total_revenue = sum(c.get('budget', 0) for c in campaigns)
    customer_acquisition_cost = total_revenue / total_conversions if total_conversions > 0 else 0
    
    # Group by channel
    channel_stats = {}
    for campaign in campaigns:
        channel = campaign.get('channel', 'General')
        if channel not in channel_stats:
            channel_stats[channel] = 0
        channel_stats[channel] += campaign.get('conversions', 0)
    
    channel_data = [
        {"name": channel, "value": conversions}
        for channel, conversions in channel_stats.items()
    ]
    
    # Top campaigns
    top_campaigns = sorted(
        campaigns,
        key=lambda x: x.get('conversions', 0),
        reverse=True
    )[:5]
    
    campaign_comparison = [
        {
            "name": c.get('name', 'Unknown'),
            "conversions": c.get('conversions', 0)
        }
        for c in top_campaigns
    ]
    
    return {
        "total_campaigns": total_campaigns,
        "total_conversions": total_conversions,
        "total_revenue": total_revenue,
        "customer_acquisition_cost": round(customer_acquisition_cost, 2),
        "channel_data": channel_data,
        "campaign_comparison": campaign_comparison
    }

@app.get("/api/analytics/amazon")
async def get_amazon_analytics():
    """Get Amazon Ads specific analytics"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Get Amazon campaigns
    cursor.execute("SELECT * FROM campaigns WHERE channel = 'Amazon Ads'")
    amazon_campaigns = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    if not amazon_campaigns:
        return {
            "total_campaigns": 0,
            "total_spend": 0,
            "total_conversions": 0,
            "average_acos": 0,
            "average_roas": 0,
            "service_info": {
                "provider": "Trilokana Marketing",
                "package": "Monthly Optimization (Up to 3 Campaigns | Max 10 SKUs)",
                "cost": 30000,
                "url": "https://trilokana.com/product/amazon-ads-campaign-optimization/"
            }
        }
    
    total_spend = sum(c.get('budget', 0) for c in amazon_campaigns)
    total_conversions = sum(c.get('conversions', 0) for c in amazon_campaigns)
    
    # Amazon-specific metrics (simulated based on industry standards)
    average_acos = 32.1  # Average Advertising Cost of Sales
    average_roas = 3.14  # Average Return on Ad Spend
    total_impressions = 373000
    total_clicks = 8500
    average_ctr = 2.28  # Click Through Rate
    average_cpc = 8.82  # Cost Per Click
    
    return {
        "total_campaigns": len(amazon_campaigns),
        "total_spend": total_spend,
        "total_conversions": total_conversions,
        "average_acos": average_acos,
        "average_roas": average_roas,
        "total_impressions": total_impressions,
        "total_clicks": total_clicks,
        "average_ctr": average_ctr,
        "average_cpc": average_cpc,
        "campaigns": [
            {
                "name": c.get('name'),
                "budget": c.get('budget'),
                "conversions": c.get('conversions'),
                "status": c.get('status')
            }
            for c in amazon_campaigns
        ],
        "service_info": {
            "provider": "Trilokana Marketing",
            "package": "Monthly Optimization (Up to 3 Campaigns | Max 10 SKUs)",
            "cost": 30000,
            "features": [
                "Weekly performance reports",
                "Regular bidding & keyword adjustments",
                "Negative keyword management",
                "Monthly strategy consultation",
                "New campaign setup when required"
            ],
            "url": "https://trilokana.com/product/amazon-ads-campaign-optimization/"
        }
    }

# ==================== Health Check ====================

@app.get("/")
async def root():
    return {
        "message": "AdWise Backend Running 🚀",
        "status": "running",
        "version": "1.0.0",
        "database": "SQLite"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is operational"}

@app.get("/api/health")
async def api_health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
