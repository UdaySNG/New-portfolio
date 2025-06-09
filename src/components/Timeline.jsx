import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaTrophy } from 'react-icons/fa';
import useFetchTimeline from '../hooks/useFetchTimeline';
import Loading from './Loading';

const Timeline = () => {
  const { events, loading, error } = useFetchTimeline();
  const [activeEvent, setActiveEvent] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'education':
        return <FaGraduationCap className="w-6 h-6" />;
      case 'work':
        return <FaBriefcase className="w-6 h-6" />;
      case 'project':
        return <FaCode className="w-6 h-6" />;
      case 'achievement':
        return <FaTrophy className="w-6 h-6" />;
      default:
        return <FaCode className="w-6 h-6" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('nl-NL', options);
  };

  const formatDateRange = (from, to, present) => {
    if (!from) return '';
    const fromDate = formatDate(from);
    const toDate = present ? 'Heden' : (to ? formatDate(to) : '');
    return `${fromDate} - ${toDate}`;
  };

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading timeline..." compact />
    </div>
  );
  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading timeline..." compact error={error} />
    </div>
  );

  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">Timeline</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            A journey through my professional and educational milestones.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent"></div>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative mb-12 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-1/2 pr-12 ${index % 2 === 0 ? 'pl-12' : ''}`}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-accent rounded-full left-0"></div>
                <h3 className="text-xl font-bold mb-2 text-primary">{event.title}</h3>
                <p className="text-secondary mb-2">{event.date}</p>
                <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline; 