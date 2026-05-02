/**
 * Adwise Tracker React Component
 * 
 * Easy integration of Adwise tracking into React applications
 * 
 * Usage:
 * import AdwiseTracker from './components/AdwiseTracker';
 * 
 * <AdwiseTracker 
 *   apiUrl="http://localhost:8000"
 *   trackingId="my_react_app"
 *   autoTrack={true}
 *   debug={false}
 * />
 */

import { useEffect } from 'react';

const AdwiseTracker = ({ 
  apiUrl = 'http://localhost:8000', 
  trackingId, 
  autoTrack = true,
  debug = false 
}) => {
  useEffect(() => {
    // Load tracking script
    const script = document.createElement('script');
    script.src = `${apiUrl}/static/adwise-tracker.min.js`;
    script.async = true;
    
    script.onload = () => {
      // Initialize tracker once script is loaded
      if (window.AdwiseTracker) {
        window.AdwiseTracker.init({
          apiUrl,
          trackingId,
          autoTrack,
          debug
        });
        
        if (debug) {
          console.log('Adwise Tracker initialized', { apiUrl, trackingId });
        }
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Adwise Tracker script');
    };
    
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiUrl, trackingId, autoTrack, debug]);
  
  return null; // This component doesn't render anything
};

// Helper hook for tracking events
export const useAdwiseTracker = () => {
  const trackEvent = (eventName, metadata = {}) => {
    if (window.AdwiseTracker) {
      window.AdwiseTracker.trackEvent(eventName, metadata);
    } else {
      console.warn('Adwise Tracker not initialized');
    }
  };
  
  const trackConversion = (conversionType, revenue, metadata = {}) => {
    if (window.AdwiseTracker) {
      window.AdwiseTracker.trackConversion(conversionType, revenue, metadata);
    } else {
      console.warn('Adwise Tracker not initialized');
    }
  };
  
  const trackClick = (url, text) => {
    if (window.AdwiseTracker) {
      window.AdwiseTracker.trackClick(url, text);
    } else {
      console.warn('Adwise Tracker not initialized');
    }
  };
  
  const trackPageView = () => {
    if (window.AdwiseTracker) {
      window.AdwiseTracker.trackPageView();
    } else {
      console.warn('Adwise Tracker not initialized');
    }
  };
  
  return {
    trackEvent,
    trackConversion,
    trackClick,
    trackPageView
  };
};

export default AdwiseTracker;
