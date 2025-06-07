import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-lighter text-sm text-white rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          {text}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-lighter rotate-45" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Tooltip; 