import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import SocialLinks from './SocialLinks';

const GetInTouch = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      content: "udaysngjobs@gmail.com",
      link: "mailto:udaysngjobs@gmail.com"
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone",
      content: "+31 6 12345678",
      link: "tel:+31612345678"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Location",
      content: "Amsterdam, Netherlands",
      link: null
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Availability",
      content: "Mon-Fri, 9:00-17:00",
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {/* Contact Information Cards */}
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-dark-lighter/70 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  {info.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">{info.title}</h3>
                  {info.link ? (
                    <a 
                      href={info.link}
                      className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white dark:bg-dark-lighter/50 backdrop-blur-sm rounded-xl p-8 mb-8 shadow-sm dark:shadow-none">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Connect with me</h3>
            <SocialLinks className="mb-0" />
          </div>
          
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            Contact Me
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInTouch; 