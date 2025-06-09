import { useState, useEffect, useRef } from 'react';
import timelineData from '../data/timeline.json';

const BASE_URL = 'http://localhost:8000/api';
const FETCH_TIMEOUT = 5000; // 5 seconds timeout
const HEALTH_CHECK_INTERVAL = 15000; // Check every 15 seconds instead of 5

const useFetchTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [error, setError] = useState(null);
  const hasConnectedRef = useRef(false); // Track if we've ever connected successfully
  const healthCheckRef = useRef(null); // Store interval reference

  const fetchTimeline = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Fetch timeout reached, aborting request...');
      controller.abort();
    }, FETCH_TIMEOUT);

    try {
      console.log('Attempting to fetch from API...');
      const response = await fetch(`${BASE_URL}/timeline`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch timeline: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Successfully fetched data from API:', data);
      
      const timelineData = Array.isArray(data) ? data : (data.data || []);
      
      if (!timelineData || timelineData.length === 0) {
        throw new Error('No timeline data received');
      }
      
      setEvents(timelineData);
      setIsUsingFallback(false);
      setError(null);
      setLoading(false);
      hasConnectedRef.current = true; // Mark that we've successfully connected
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        console.warn('Request was aborted due to timeout');
      } else {
        console.warn('API fetch failed:', err.message);
      }
      setEvents(timelineData.data || []);
      setIsUsingFallback(true);
      setError(err);
      setLoading(false);
    }
  };

  // Health check function to detect backend status
  const checkBackendHealth = async () => {
    // Don't check if tab is not visible
    if (document.hidden) return;

    try {
      const response = await fetch(`${BASE_URL}/health`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Backend health check failed');
      }
      
      // If we're using fallback but backend is healthy, fetch real data
      if (isUsingFallback) {
        console.log('Backend is healthy, fetching real data...');
        fetchTimeline();
      }
    } catch (err) {
      // If we're not using fallback but backend is down, switch to fallback
      if (!isUsingFallback) {
        console.log('Backend is down, switching to fallback data...');
        setEvents(timelineData.data || []);
        setIsUsingFallback(true);
        setError(err);
      }
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTimeline();

    // Only start health checks if we've ever connected successfully
    if (hasConnectedRef.current) {
      healthCheckRef.current = setInterval(checkBackendHealth, HEALTH_CHECK_INTERVAL);
    }

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear interval when tab is not visible
        if (healthCheckRef.current) {
          clearInterval(healthCheckRef.current);
          healthCheckRef.current = null;
        }
      } else if (hasConnectedRef.current) {
        // Restart interval when tab becomes visible again
        healthCheckRef.current = setInterval(checkBackendHealth, HEALTH_CHECK_INTERVAL);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (healthCheckRef.current) {
        clearInterval(healthCheckRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isUsingFallback]); // Re-run effect when fallback state changes

  return { events, loading, isUsingFallback, error };
};

export default useFetchTimeline; 