import { useState, useEffect, useRef, useCallback } from 'react';
import projectsData from '../data/projects.json';

const BASE_URL = 'http://localhost:8000/api';
const FETCH_TIMEOUT = 5000; // 5 seconds timeout
const HEALTH_CHECK_INTERVAL = 15000; // Check every 15 seconds

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [error, setError] = useState(null);
  const hasConnectedRef = useRef(false); // Track if we've ever connected successfully
  const healthCheckRef = useRef(null); // Store interval reference

  const fetchCategories = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Fetch timeout reached, aborting request...');
      controller.abort();
    }, FETCH_TIMEOUT);

    try {
      console.log('Attempting to fetch from API...');
      const response = await fetch(`${BASE_URL}/categories`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Successfully fetched data from API:', data);
      
      const categoriesData = Array.isArray(data) ? data : (data.data || []);
      
      if (!categoriesData || categoriesData.length === 0) {
        throw new Error('No categories data received');
      }
      
      setCategories(categoriesData);
      setIsUsingFallback(false);
      setError(null);
      setLoading(false);
      hasConnectedRef.current = true; // Mark that we've successfully connected
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        console.warn('Request was aborted due to timeout');
        setError('Request timed out. Using fallback data.');
      } else {
        console.warn('API fetch failed:', err.message);
        setError(err.message || 'Failed to fetch categories. Using fallback data.');
      }
      // Extract unique categories from projects.json
      const fallbackData = [...new Set(projectsData.data.map(project => project.category))]
        .filter(Boolean) // Remove any null/undefined values
        .map((category, index) => ({
          id: index + 1,
          name: category
        }));
      setCategories(fallbackData);
      setIsUsingFallback(true);
      setLoading(false);
    }
  };

  // Health check function to detect backend status
  const checkBackendHealth = useCallback(async () => {
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
        fetchCategories();
      }
    } catch (err) {
      // If we're not using fallback but backend is down, switch to fallback
      if (!isUsingFallback) {
        console.log('Backend is down, switching to fallback data...');
        const fallbackData = [...new Set(projectsData.data.map(project => project.category))]
          .filter(Boolean)
          .map((category, index) => ({
            id: index + 1,
            name: category
          }));
        setCategories(fallbackData);
        setIsUsingFallback(true);
        setError('Backend is unavailable. Using fallback data.');
      }
    }
  }, [isUsingFallback]); // Add isUsingFallback as dependency

  useEffect(() => {
    // Initial fetch
    fetchCategories();

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
  }, [checkBackendHealth]); // Add checkBackendHealth as dependency

  return { categories, loading, isUsingFallback, error };
};

export default useFetchCategories; 