/**
 * Tracking Demo Page
 * Demonstrates how to use Adwise Tracker in React
 */

import React, { useState } from 'react';
import AdwiseTracker, { useAdwiseTracker } from '../components/AdwiseTracker';

const TrackingDemo = () => {
  const { trackEvent, trackConversion, trackClick } = useAdwiseTracker();
  const [eventLog, setEventLog] = useState([]);

  const addToLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog(prev => [{ timestamp, message }, ...prev].slice(0, 10));
  };

  const handleCustomEvent = () => {
    trackEvent('button_click', {
      button_name: 'Custom Event Button',
      page: 'tracking_demo'
    });
    addToLog('Custom event tracked');
  };

  const handleConversion = () => {
    trackConversion('purchase', 99.99, {
      product_id: 'DEMO-123',
      product_name: 'Demo Product',
      quantity: 1
    });
    addToLog('Conversion tracked: $99.99');
  };

  const handleClick = () => {
    trackClick('https://example.com', 'Example Link');
    addToLog('Click event tracked');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Initialize Tracker */}
      <AdwiseTracker 
        apiUrl="http://localhost:8000"
        trackingId="react_demo_app"
        autoTrack={true}
        debug={true}
      />

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎯 Adwise Tracker Demo
          </h1>
          <p className="text-gray-600 mb-8">
            Test tracking events in your React application
          </p>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleCustomEvent}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Track Custom Event
            </button>

            <button
              onClick={handleClick}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Track Click
            </button>

            <button
              onClick={handleConversion}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Track Conversion ($99.99)
            </button>
          </div>

          {/* Event Log */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Event Log
            </h2>
            <div className="space-y-2">
              {eventLog.length === 0 ? (
                <p className="text-gray-500 italic">No events yet. Click a button to track an event.</p>
              ) : (
                eventLog.map((log, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <span className="text-gray-500 font-mono">{log.timestamp}</span>
                    <span className="text-gray-700">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Integration Code */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Integration Code
            </h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import AdwiseTracker, { useAdwiseTracker } from './components/AdwiseTracker';

function MyComponent() {
  const { trackEvent, trackConversion } = useAdwiseTracker();

  return (
    <>
      <AdwiseTracker 
        apiUrl="http://localhost:8000"
        trackingId="my_app"
        autoTrack={true}
      />
      
      <button onClick={() => trackEvent('button_click')}>
        Track Event
      </button>
      
      <button onClick={() => trackConversion('purchase', 99.99)}>
        Track Conversion
      </button>
    </>
  );
}`}
            </pre>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                ✅ Automatic Tracking
              </h3>
              <p className="text-blue-700 text-sm">
                Page views, clicks, and form submissions are tracked automatically when autoTrack is enabled.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                🚀 Asynchronous
              </h3>
              <p className="text-green-700 text-sm">
                All tracking requests are non-blocking and won't slow down your application.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                📊 Real-time Analytics
              </h3>
              <p className="text-purple-700 text-sm">
                Events are processed in real-time and available immediately in your analytics dashboard.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                🔒 Privacy-Friendly
              </h3>
              <p className="text-orange-700 text-sm">
                No third-party cookies, uses localStorage for session management.
              </p>
            </div>
          </div>

          {/* API Info */}
          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📡 API Endpoints
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded font-mono text-xs">POST</span>
                <code className="text-gray-700">/api/tracking/event</code>
                <span className="text-gray-500">- Track event</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded font-mono text-xs">GET</span>
                <code className="text-gray-700">/api/tracking/pixel.gif</code>
                <span className="text-gray-500">- Tracking pixel</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded font-mono text-xs">GET</span>
                <code className="text-gray-700">/api/tracking/stats/:id</code>
                <span className="text-gray-500">- Get statistics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingDemo;
