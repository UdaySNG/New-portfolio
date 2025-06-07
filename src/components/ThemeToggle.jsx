import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      console.log('Initial theme from localStorage:', saved);
      if (saved) {
        return saved === 'dark';
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('System prefers dark:', prefersDark);
      return prefersDark;
    }
    return true;
  });

  useEffect(() => {
    console.log('Theme changed to:', isDark ? 'dark' : 'light');
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    console.log('Current classes on root:', root.classList.toString());
  }, [isDark]);

  const handleToggle = () => {
    console.log('Toggle clicked, current theme:', isDark ? 'dark' : 'light');
    setIsDark(!isDark);
  };

  return (
    <motion.button
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-24 z-50 bg-dark-lighter p-3 rounded-r-lg shadow-lg hover:bg-accent/20 transition-colors"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FaSun className="w-5 h-5 text-yellow-400" />
        ) : (
          <FaMoon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 