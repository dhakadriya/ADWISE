// API Service for Adwise Marketing System
// Connects React frontend to Python FastAPI backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://adwise-tho4.onrender.com/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || error.message || 'Request failed');
  }
  return response.json();
};

// Helper function to make authenticated requests
const authenticatedFetch = (url, options = {}) => {
  const token = getAuthToken();
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};

// ==================== Authentication APIs ====================

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
    }
    
    return data;
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: credentials.email,
        password: credentials.password,
      }),
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.access_token) {
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('userEmail', credentials.email);
    }
    
    return data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// ==================== Campaign APIs ====================

export const campaignAPI = {
  // Get all campaigns
  getAll: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/campaigns`);
    return handleResponse(response);
  },

  // Get single campaign
  getById: async (id) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/campaigns/${id}`);
    return handleResponse(response);
  },

  // Create new campaign
  create: async (campaignData) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
    return handleResponse(response);
  },

  // Update campaign
  update: async (id, campaignData) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaignData),
    });
    return handleResponse(response);
  },

  // Delete campaign
  delete: async (id) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// ==================== Tracking Link APIs ====================

export const trackingLinkAPI = {
  // Get all tracking links
  getAll: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/tracking-links`);
    return handleResponse(response);
  },

  // Create new tracking link
  create: async (linkData) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/tracking-links`, {
      method: 'POST',
      body: JSON.stringify(linkData),
    });
    return handleResponse(response);
  },
};

// ==================== Customer APIs ====================

export const customerAPI = {
  // Get all customers
  getAll: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/customers`);
    return handleResponse(response);
  },

  // Get single customer
  getById: async (id) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/customers/${id}`);
    return handleResponse(response);
  },

  // Create new customer
  create: async (customerData) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
    return handleResponse(response);
  },
};

// ==================== Touchpoint APIs ====================

export const touchpointAPI = {
  // Get all touchpoints
  getAll: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/touchpoints`);
    return handleResponse(response);
  },

  // Record new touchpoint
  create: async (touchpointData) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/touchpoints`, {
      method: 'POST',
      body: JSON.stringify(touchpointData),
    });
    return handleResponse(response);
  },
};

// ==================== Conversion APIs ====================

export const conversionAPI = {
  // Get all conversions
  getAll: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/conversions`);
    return handleResponse(response);
  },

  // Get single conversion
  getById: async (id) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/conversions/${id}`);
    return handleResponse(response);
  },

  // Record new conversion
  create: async (conversionData) => {
    const response = await authenticatedFetch(`${API_BASE_URL}/conversions`, {
      method: 'POST',
      body: JSON.stringify(conversionData),
    });
    return handleResponse(response);
  },
};

// ==================== Analytics APIs ====================

export const analyticsAPI = {
  // Get dashboard metrics
  getDashboard: async () => {
    const response = await authenticatedFetch(`${API_BASE_URL}/analytics/dashboard`);
    return handleResponse(response);
  },
};

// Export all APIs as a single object
const api = {
  auth: authAPI,
  campaigns: campaignAPI,
  trackingLinks: trackingLinkAPI,
  customers: customerAPI,
  touchpoints: touchpointAPI,
  conversions: conversionAPI,
  analytics: analyticsAPI,
};

export default api;
