import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ text, compact = false, error }) => {
  const [loadingText, setLoadingText] = useState(text);
  const [isLongLoading, setIsLongLoading] = useState(false);
  const [isVeryLongLoading, setIsVeryLongLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoadingText("Fix je WiFi, man! 😅");
      return;
    }

    const longTimer = setTimeout(() => {
      setIsLongLoading(true);
      setLoadingText("Any second now...");
    }, 5000);

    const veryLongTimer = setTimeout(() => {
      setIsVeryLongLoading(true);
      setLoadingText("He, kijk mij niet aan... het is jouw WiFi! 😅");
    }, 10000);

    return () => {
      clearTimeout(longTimer);
      clearTimeout(veryLongTimer);
    };
  }, [text, error]);

  const containerClasses = compact 
    ? 'py-8 flex flex-col items-center justify-center gap-4'
    : 'min-h-screen bg-white dark:bg-dark flex flex-col items-center justify-center gap-4';

  if (error) {
    return (
      <div className={containerClasses}>
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${compact ? 'w-3 h-12' : 'w-4 h-16'} bg-red-500 rounded-full`}
              animate={{
                height: compact ? [48, 24, 48] : [64, 32, 64],
                y: compact ? [0, 12, 0] : [0, 16, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p 
            key={loadingText}
            className="text-red-500 text-sm font-medium text-center max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.2 }}
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${compact ? 'w-3 h-12' : 'w-4 h-16'} bg-accent rounded-full`}
            animate={{
              height: compact ? [48, 24, 48] : [64, 32, 64],
              y: compact ? [0, 12, 0] : [0, 16, 0],
              scale: isLongLoading ? [1, 1.1, 1] : 1,
              rotate: isVeryLongLoading ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: isLongLoading ? 0.6 : 0.8,
              repeat: Infinity,
              delay: index * (isLongLoading ? 0.15 : 0.2),
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p 
          key={loadingText}
          className="text-gray-600 dark:text-gray-400 text-sm font-medium text-center max-w-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.2 }}
        >
          {loadingText}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Loading; 