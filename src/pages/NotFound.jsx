import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaLock, FaCookie } from 'react-icons/fa';
import { useState, useEffect, useMemo } from 'react';

const NotFound = () => {
  const location = useLocation();
  const [attemptCount, setAttemptCount] = useState(0);
  const [message, setMessage] = useState("");
  const [showRickRoll, setShowRickRoll] = useState(false);
  const isAdminRoute = location.pathname.toLowerCase().includes('admin');

  // Calculate background element positions once
  const backgroundElements = useMemo(() => {
    return [...Array(5)].map(() => ({
      x1: Math.random() * 200 - 100,
      y1: Math.random() * 200 - 100,
      x2: Math.random() * 200 - 100,
      y2: Math.random() * 200 - 100,
    }));
  }, []);

  useEffect(() => {
    // Get the current count and last attempt time from localStorage
    const currentCount = parseInt(localStorage.getItem('failedAttempts') || '0');
    const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime') || '0');
    const currentTime = Date.now();
    
    // Reset counter if more than 1 hour has passed
    if (currentTime - lastAttemptTime > 3600000) { // 1 hour in milliseconds
      localStorage.setItem('failedAttempts', '0');
      localStorage.setItem('lastAttemptTime', currentTime.toString());
      setAttemptCount(0);
    } else {
      setAttemptCount(currentCount);
    }

    // Set different messages based on the count
    if (isAdminRoute) {
      if (currentCount === 1) {
        setMessage("Hmm, trying to access the admin area? Nice try!");
      } else if (currentCount === 2) {
        setMessage("Still trying? You're persistent!");
      } else if (currentCount === 3) {
        setMessage("Bro, seriously? Stop trying to hack my site 😅");
      } else if (currentCount === 4) {
        setMessage("Okay, you're really determined. But there's nothing here!");
      } else if (currentCount === 5) {
        setMessage("Alright, you win! Here's a cookie 🍪 (not really)");
        setShowRickRoll(true);
      } else if (currentCount > 5) {
        setMessage("You're still here? Fine, take another cookie 🍪");
        setShowRickRoll(true);
      } else {
        // First attempt
        const newCount = currentCount + 1;
        localStorage.setItem('failedAttempts', newCount.toString());
        localStorage.setItem('lastAttemptTime', currentTime.toString());
        setAttemptCount(newCount);
        setMessage("Hmm, trying to access the admin area? Nice try!");
      }
    } else {
      setMessage("Oops! The page you're looking for seems to have vanished into the digital void.");
    }
  }, [location.pathname, isAdminRoute]); // Only run when the path changes

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-primary mb-4">Page Not Found</h2>
          <p className="text-secondary max-w-md mx-auto">
            {message}
          </p>
          {isAdminRoute && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.5, 
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              className="mt-4"
            >
              <FaLock className="w-8 h-8 text-accent mx-auto" />
            </motion.div>
          )}
          {showRickRoll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1,
                duration: 0.5,
                ease: "easeOut"
              }}
              className="mt-6"
            >
              <a
                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
              >
                <FaCookie className="w-5 h-5" />
                <span>OK, Login Here</span>
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Animated Background Elements */}
        <div className="relative mb-12">
          {backgroundElements.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-accent/5"
              initial={{ 
                x: pos.x1,
                y: pos.y1,
                scale: 0
              }}
              animate={{
                x: [pos.x1, pos.x2],
                y: [pos.y1, pos.y2],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            ease: "easeOut"
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            <FaHome className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark-lighter text-white rounded-lg hover:bg-dark-lighter/90 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            ease: "easeOut"
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-accent/20 text-sm"
        >
          <p>Lost in the digital wilderness?</p>
          {isAdminRoute && (
            <p className="mt-2">Attempt #{attemptCount}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 