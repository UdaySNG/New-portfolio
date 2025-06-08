import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const socialLinks = [
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn'
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: 'https://github.com/yourusername',
      label: 'GitHub'
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: 'https://twitter.com/yourusername',
      label: 'Twitter'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Get in Touch</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="container-card p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary mb-1">Email</h3>
                  <a href="mailto:udaysngjobs@gmail.com" className="text-secondary hover:text-accent transition-colors">
                    udaysngjobs@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary mb-1">Phone</h3>
                  <a href="tel:+31612345678" className="text-secondary hover:text-accent transition-colors">
                    +31 6 12345678
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary mb-1">Location</h3>
                  <p className="text-secondary">Amsterdam, Netherlands</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-primary mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
                    title={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="container-card p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-200 dark:border-gray-700 text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-200 dark:border-gray-700 text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-200 dark:border-gray-700 text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Subject of your message"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-200 dark:border-gray-700 text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 