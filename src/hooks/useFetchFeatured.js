import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

const BASE_URL = 'http://localhost:8000/api';
const FETCH_TIMEOUT = 300; // Reduced timeout to 300ms for faster fallback
const MIN_LOADING_TIME = 500; // Minimum time to show loading state

const useFetchFeatured = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      const startTime = Date.now();

      try {
        const response = await fetch(`${BASE_URL}/projects/featured`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        const featuredData = Array.isArray(data) ? data : (data.data || []);
        
        if (featuredData && featuredData.length > 0) {
          // Ensure minimum loading time
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
          
          if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime));
          }
          
          setFeaturedProjects(featuredData);
          setIsUsingFallback(false);
          setLoading(false);
        } else {
          throw new Error('No featured data');
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('Using fallback data:', err.message);
        
        // Ensure minimum loading time for fallback data
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        const fallbackFeatured = projectsData.data.filter(project => project.featured === 1);
        setFeaturedProjects(fallbackFeatured);
        setIsUsingFallback(true);
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredProjects, loading, isUsingFallback };
};

export default useFetchFeatured; 