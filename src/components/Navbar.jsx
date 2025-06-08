import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ].filter(item => !(item.href === '/' && location.pathname === '/'));

  const filteredNavItems = navItems.filter(item => item.href !== location.pathname);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-dark-lighter/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-text-dark">
                Uday Singh
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-dark-lighter z-40 md:hidden"
          >
            <div className="h-full flex flex-col">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col items-start justify-center pl-12 space-y-12">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group relative text-4xl font-medium text-gray-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {item.name}
                    <span className="absolute -bottom-2 -left-12 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 group-hover:bg-accent transition-colors" />
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 