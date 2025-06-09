import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaCheck, FaTimes } from 'react-icons/fa';
import Notification from '../components/Notification';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [fieldValidation, setFieldValidation] = useState({
    name: { isValid: false, isDirty: false },
    email: { isValid: false, isDirty: false },
    subject: { isValid: false, isDirty: false },
    message: { isValid: false, isDirty: false }
  });

  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const textareaRef = useRef(null);

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateName = (name) => {
    return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
  };

  const validateField = (name, value) => {
    if (typeof value !== 'string') return false;
    
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'subject':
        return value.length >= 3;
      case 'message':
        return value.length >= 10;
      default:
        return false;
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [formData.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update validation state
    setFieldValidation(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        isDirty: true,
        isValid: validateField(name, value)
      }
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    setFocusedField(null);
    // Mark field as dirty on blur
    setFieldValidation(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        isDirty: true
      }
    }));
  };

  // Calculate form completion percentage
  const formCompletion = () => {
    const fields = ['name', 'email', 'subject', 'message'];
    const completedFields = fields.filter(field => fieldValidation[field].isValid);
    return (completedFields.length / fields.length) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setNotification({
          type: 'success',
          message: 'Message sent successfully!'
        });
      } else if (response.status === 422) {
        const errorMessages = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setNotification({
          type: 'error',
          message: `Validation errors:\n${errorMessages}`
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
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
            
            {/* Form Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Form Progress</span>
                <span>{Math.round(formCompletion())}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-accent h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${formCompletion()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <div className="relative">
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 bg-transparent border-b-2 transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-accent' 
                        : fieldValidation.name.isDirty
                          ? fieldValidation.name.isValid
                            ? 'border-green-500'
                            : 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700'
                    } text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    placeholder="Your name"
                    required
                  />
                  {fieldValidation.name.isDirty && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {fieldValidation.name.isValid ? (
                        <FaCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <FaTimes className="w-4 h-4 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </div>
                {fieldValidation.name.isDirty && !fieldValidation.name.isValid && (
                  <p className="mt-1 text-sm text-red-500">Please enter a valid name (at least 2 characters, letters only)</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <div className="relative">
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 bg-transparent border-b-2 transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-accent' 
                        : fieldValidation.email.isDirty
                          ? fieldValidation.email.isValid
                            ? 'border-green-500'
                            : 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700'
                    } text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                  {fieldValidation.email.isDirty && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {fieldValidation.email.isValid ? (
                        <FaCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <FaTimes className="w-4 h-4 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </div>
                {fieldValidation.email.isDirty && !fieldValidation.email.isValid && (
                  <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </label>
                <div className="relative">
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={() => handleBlur('subject')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 bg-transparent border-b-2 transition-all duration-300 ${
                      focusedField === 'subject' 
                        ? 'border-accent' 
                        : fieldValidation.subject.isDirty
                          ? fieldValidation.subject.isValid
                            ? 'border-green-500'
                            : 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700'
                    } text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    placeholder="Subject of your message"
                    required
                  />
                  {fieldValidation.subject.isDirty && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {fieldValidation.subject.isValid ? (
                        <FaCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <FaTimes className="w-4 h-4 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </div>
                {fieldValidation.subject.isDirty && !fieldValidation.subject.isValid && (
                  <p className="mt-1 text-sm text-red-500">Subject must be at least 3 characters long</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="block text-sm font-medium text-primary">
                    Message
                  </label>
                  <span className="text-sm text-gray-500">
                    {formData.message.length}/1000
                  </span>
                </div>
                <div className="relative">
                  <motion.textarea
                    ref={textareaRef}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    disabled={isSubmitting}
                    maxLength={1000}
                    rows="4"
                    className={`w-full px-4 py-2 bg-transparent border-b-2 transition-all duration-300 ${
                      focusedField === 'message' 
                        ? 'border-accent' 
                        : fieldValidation.message.isDirty
                          ? fieldValidation.message.isValid
                            ? 'border-green-500'
                            : 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700'
                    } text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    placeholder="Your message"
                    required
                  />
                  {fieldValidation.message.isDirty && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-2"
                    >
                      {fieldValidation.message.isValid ? (
                        <FaCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <FaTimes className="w-4 h-4 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </div>
                {fieldValidation.message.isDirty && !fieldValidation.message.isValid && (
                  <p className="mt-1 text-sm text-red-500">Message must be at least 10 characters long</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !Object.values(fieldValidation).every(field => field.isValid)}
                className={`w-full px-6 py-3 bg-accent text-white rounded-lg transition-all duration-300 font-medium ${
                  isSubmitting || !Object.values(fieldValidation).every(field => field.isValid)
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-accent/90 hover:shadow-lg'
                }`}
                whileHover={!isSubmitting && Object.values(fieldValidation).every(field => field.isValid) ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && Object.values(fieldValidation).every(field => field.isValid) ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 