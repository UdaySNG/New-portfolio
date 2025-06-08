import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import Timeline from '../components/Timeline';

const About = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-accent/5"
            initial={{ x: -100, y: Math.random() * 100 }}
            animate={{
              x: ['-100%', '100%'],
              y: [Math.random() * 100, Math.random() * 100],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Me</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Software developer in opleiding met passie voor moderne web technologieën.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg dark:shadow-none"
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-accent" />
                <span className="text-secondary">Amsterdam, Netherlands</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-accent" />
                <a href="mailto:udaysngjobs@gmail.com" className="text-secondary hover:text-accent transition-colors">
                  udaysngjobs@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-accent" />
                <a href="tel:+31612345678" className="text-secondary hover:text-accent transition-colors">
                  +31 6 12345678
                </a>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg dark:shadow-none"
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary">Software Development MBO 4</h4>
                <p className="text-secondary">Mediacollege Amsterdam</p>
                <p className="text-sm text-gray-500">September 2021 - Juli 2025</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg dark:shadow-none mb-16"
        >
          <h3 className="text-xl font-semibold mb-4 text-primary">Experience</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-primary">Stage Software Development</h4>
              <p className="text-secondary">12build</p>
              <p className="text-sm text-gray-500">September 2024 - Februari 2025</p>
              <p className="mt-2 text-secondary">
                Tweede stage periode als onderdeel van de MBO opleiding, waar ik heb gewerkt aan verschillende software development projecten.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-primary">Stage Software Development</h4>
              <p className="text-secondary">Netxz</p>
              <p className="text-sm text-gray-500">Februari 2024 - Juli 2024</p>
              <p className="mt-2 text-secondary">
                Eerste stage periode als onderdeel van de MBO opleiding, waar ik praktijkervaring heb opgedaan in software development.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline />
      </div>
    </section>
  );
};

export default About; 