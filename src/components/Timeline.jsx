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

  if (loading) return <Loading text="Loading timeline..." compact />;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-accent/20" />

      {/* Timeline events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Content */}
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-primary">{event.title}</h3>
                <p className="text-secondary mb-2">{formatDateRange(event.date_from, event.date_to, event.present)}</p>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>
            </div>

            {/* Icon */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
              {getIcon(event.type)}
            </div>

            {/* Empty space for alignment */}
            <div className="w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 