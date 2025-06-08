import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000/api';

const useFetchFeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/projects/featured`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch featured projects: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const projectsData = Array.isArray(data) ? data : data.data;
        
        if (!projectsData) {
          throw new Error('No featured projects data received');
        }
        
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
};

export default useFetchFeaturedProjects; 