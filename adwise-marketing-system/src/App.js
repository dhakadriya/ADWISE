import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import TrackingLinks from './pages/TrackingLinks';
import CustomerJourney from './pages/CustomerJourney';
import Analytics from './pages/Analytics';
import AIRecommendations from './pages/AIRecommendations';
import FraudDetection from './pages/FraudDetection';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import api from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    setIsAuthenticated(api.auth.isAuthenticated());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/tracking-links" element={<TrackingLinks />} />
                  <Route path="/customer-journey" element={<CustomerJourney />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/ai-insights" element={<AIRecommendations />} />
                  <Route path="/fraud-detection" element={<FraudDetection />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
