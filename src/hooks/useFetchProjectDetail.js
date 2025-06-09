import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

const BASE_URL = 'http://localhost:8000/api';
const FETCH_TIMEOUT = 5000; // 5 seconds timeout

const useFetchProjectDetail = (projectId) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!projectId) {
        setError('No project ID provided');
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('Fetch timeout reached, aborting request...');
        controller.abort();
      }, FETCH_TIMEOUT);

      try {
        console.log('Attempting to fetch from API...');
        const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Successfully fetched data from API:', data);
        
        if (!data) {
          throw new Error('No project data received');
        }

        // Handle both single project and data wrapper formats
        const projectData = data.data || data;
        
        if (!projectData) {
          throw new Error('Invalid project data format');
        }
        
        setProject(projectData);
        setIsUsingFallback(false);
        setError(null);
        setLoading(false);
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          console.warn('Request was aborted due to timeout');
          setError('Request timed out. Using fallback data.');
        } else {
          console.warn('API fetch failed:', err.message);
          setError(err.message || 'Failed to fetch project. Using fallback data.');
        }
        
        // Find the project in the local JSON data
        const fallbackProject = projectsData.data.find(p => p.id === parseInt(projectId));
        if (fallbackProject) {
          setProject(fallbackProject);
          setIsUsingFallback(true);
        } else {
          setError('Project not found in fallback data.');
        }
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  return { project, loading, isUsingFallback, error };
};

export default useFetchProjectDetail; 