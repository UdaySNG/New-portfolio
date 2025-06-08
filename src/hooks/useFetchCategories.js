import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000/api';

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const categoriesData = Array.isArray(data) ? data : data.data;
        
        if (!categoriesData) {
          throw new Error('No categories data received');
        }
        
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchCategories; 