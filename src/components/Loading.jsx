import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loading = ({ text, compact = false }) => {
  const [loadingText, setLoadingText] = useState(text);
  const [isLongLoading, setIsLongLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLongLoading(true);
      setLoadingText("Any second now...");
    }, 5000);

    return () => clearTimeout(timer);
  }, [text]);

  const containerClasses = compact 
    ? 'py-8 flex flex-col items-center justify-center gap-4'
    : 'min-h-screen bg-white dark:bg-dark flex flex-col items-center justify-center gap-4';

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
      {loadingText && (
        <motion.p 
          key={loadingText}
          className="text-gray-600 dark:text-gray-400 text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.2 }}
        >
          {loadingText}
        </motion.p>
      )}
    </div>
  );
};

export default Loading; 