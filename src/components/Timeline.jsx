import { motion } from 'framer-motion';
import useFetchTimeline from '../hooks/useFetchTimeline';
import Loading from './Loading';

const Timeline = () => {
  const { events, loading, isUsingFallback, error } = useFetchTimeline();

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

  if (error && !isUsingFallback) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loading text="Loading timeline..." compact error={error} />
    </div>
  );

  if (!events || events.length === 0) return (
    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
      <p>No timeline events available at the moment.</p>
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

        {/* Desktop Timeline */}
        <div className="relative hidden md:block">
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
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-accent rounded-full"
                  style={{ 
                    left: index % 2 === 0 ? '-2px' : 'auto',
                    right: index % 2 === 0 ? 'auto' : '-2px'
                  }}
                ></div>
                <h3 className="text-xl font-bold mb-2 text-primary">{event.title}</h3>
                <p className="text-secondary mb-2">{formatDateRange(event.date_from, event.date_to, event.present)}</p>
                <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="relative pl-8">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-accent"></div>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-8"
              >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-accent rounded-full"></div>
                  <h3 className="text-lg font-bold mb-2 text-primary">{event.title}</h3>
                  <p className="text-secondary mb-2">{formatDateRange(event.date_from, event.date_to, event.present)}</p>
                  <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 