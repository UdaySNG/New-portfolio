import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

const BASE_URL = 'http://localhost:8000/api';
const FETCH_TIMEOUT = 1000; // 1 second timeout

const useFetchTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

      try {
        const response = await fetch(`${BASE_URL}/tags`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tags: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const tagsData = Array.isArray(data) ? data : (data.data || []);
        
        if (!tagsData || tagsData.length === 0) {
          throw new Error('No tags data received');
        }
        
        setTags(tagsData);
        setIsUsingFallback(false);
        setLoading(false);
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('API fetch failed, using local JSON fallback:', err.message);
        // Extract unique tags from projects.json
        const allTags = projectsData.data.flatMap(project => project.tags || []);
        const uniqueTags = [...new Set(allTags)]
          .filter(Boolean) // Remove any null/undefined values
          .map((tag, index) => ({
            id: index + 1,
            name: tag
          }));
        setTags(uniqueTags);
        setIsUsingFallback(true);
        setLoading(false);
      }
    };

    // Only fetch if we're not already using fallback data
    if (!isUsingFallback) {
      fetchTags();
    }
  }, [isUsingFallback]);

  return { tags, loading, isUsingFallback };
};

export default useFetchTags; 