import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000/api';

const useFetchTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`${BASE_URL}/timeline`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch timeline: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const timelineData = Array.isArray(data) ? data : data.data;
        
        if (!timelineData) {
          throw new Error('No timeline data received');
        }
        
        // Sort events by date
        const sortedEvents = timelineData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(sortedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return { events, loading, error };
};

export default useFetchTimeline; 