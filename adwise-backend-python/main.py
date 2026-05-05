from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import jwt
import hashlib
import os

# Initialize FastAPI app
app = FastAPI(
    title="Adwise Marketing System API",
    description="Marketing Attribution and Analytics Platform API",
    version="1.0.0"
)

# CORS configuration - Allow all origins for deployment
# You can restrict this to your Netlify URL later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For deployment: ["https://your-app.netlify.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Security - Use environment variables in production
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# In-memory storage (replace with database in production)
users_db = {}
campaigns_db = []
tracking_links_db = []

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
    channel: str
    budget: float
    status: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class TrackingLink(BaseModel):
    id: Optional[int] = None
    name: str
    url: str
    utm_source: str
    utm_medium: str
    utm_campaign: str
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None

class DashboardMetrics(BaseModel):
    total_revenue: float
    total_conversions: int
    avg_order_value: float
    conversion_rate: float
    total_clicks: int
    total_impressions: int

# ==================== Helper Functions ====================

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    # Simple hash comparison for demo purposes
    return get_password_hash(plain_password) == hashed_password

def get_password_hash(password):
    # Simple SHA256 hashing for demo purposes
    # In production, use proper password hashing like bcrypt with salt
    return hashlib.sha256(password.encode()).hexdigest()

# ==================== Authentication Routes ====================

@app.post("/api/auth/register", response_model=Token)
async def register(user: UserRegister):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    users_db[user.email] = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password
    }
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

# ==================== Campaign Routes ====================

@app.get("/api/campaigns")
async def get_campaigns():
    return campaigns_db

@app.post("/api/campaigns")
async def create_campaign(campaign: Campaign):
    campaign.id = len(campaigns_db) + 1
    campaigns_db.append(campaign.dict())
    return campaign

@app.put("/api/campaigns/{campaign_id}")
async def update_campaign(campaign_id: int, campaign: Campaign):
    for i, c in enumerate(campaigns_db):
        if c["id"] == campaign_id:
            campaign.id = campaign_id
            campaigns_db[i] = campaign.dict()
            return campaign
    raise HTTPException(status_code=404, detail="Campaign not found")

@app.delete("/api/campaigns/{campaign_id}")
async def delete_campaign(campaign_id: int):
    for i, c in enumerate(campaigns_db):
        if c["id"] == campaign_id:
            campaigns_db.pop(i)
            return {"message": "Campaign deleted"}
    raise HTTPException(status_code=404, detail="Campaign not found")

# ==================== Tracking Link Routes ====================

@app.get("/api/tracking-links")
async def get_tracking_links():
    return tracking_links_db

@app.post("/api/tracking-links")
async def create_tracking_link(link: TrackingLink):
    link.id = len(tracking_links_db) + 1
    tracking_links_db.append(link.dict())
    return link

# ==================== Analytics Routes ====================

@app.get("/api/analytics/dashboard", response_model=DashboardMetrics)
async def get_dashboard_metrics():
    # Return mock data for now
    return {
        "total_revenue": 125430.50,
        "total_conversions": 1234,
        "avg_order_value": 101.65,
        "conversion_rate": 3.2,
        "total_clicks": 45678,
        "total_impressions": 234567
    }

# ==================== Health Check ====================

@app.get("/")
async def root():
    return {"message": "AdWise Backend Running 🚀", "status": "running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is operational"}

# For deployment platforms that need a simple health check
@app.get("/api/health")
async def api_health():
    return {"status": "ok"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
