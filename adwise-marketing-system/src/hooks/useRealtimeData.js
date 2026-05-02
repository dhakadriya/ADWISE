/**
 * useRealtimeData Hook
 * Custom React hook for real-time dashboard data updates
 */
import { useState, useEffect, useCallback } from 'react';
import useWebSocket from './useWebSocket';

const useRealtimeData = () => {
  const [realtimeData, setRealtimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // WebSocket URL
  const wsUrl = token
    ? `ws://localhost:8000/ws/realtime?token=${token}`
    : null;

  // Handle incoming messages
  const handleMessage = useCallback((data) => {
    if (data.type === 'realtime_update') {
      setRealtimeData(data.data);
      setLastUpdate(new Date(data.timestamp));
      setIsLoading(false);
      setError(null);
    } else if (data.type === 'connection_status') {
      console.log('Connection status:', data.status);
      if (data.status === 'connected') {
        setIsLoading(false);
      }
    } else if (data.type === 'error') {
      console.error('WebSocket error:', data.message);
      setError(data.message);
    }
  }, []);

  // Handle connection open
  const handleOpen = useCallback(() => {
    console.log('Real-time data connection established');
    setError(null);
  }, []);

  // Handle connection close
  const handleClose = useCallback(() => {
    console.log('Real-time data connection closed');
    setIsLoading(true);
  }, []);

  // Handle connection error
  const handleError = useCallback((event) => {
    console.error('Real-time data connection error:', event);
    setError('Connection error. Retrying...');
  }, []);

  // Initialize WebSocket
  const {
    isConnected,
    connectionStatus,
    sendMessage,
    requestUpdate,
  } = useWebSocket(wsUrl, {
    onMessage: handleMessage,
    onOpen: handleOpen,
    onClose: handleClose,
    onError: handleError,
    reconnect: true,
    reconnectInterval: 3000,
    reconnectAttempts: 5,
  });

  // Request immediate update
  const refresh = useCallback(() => {
    requestUpdate();
  }, [requestUpdate]);

  return {
    data: realtimeData,
    isLoading,
    isConnected,
    connectionStatus,
    error,
    lastUpdate,
    refresh,
  };
};

export default useRealtimeData;
