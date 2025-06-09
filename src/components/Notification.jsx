import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Notification = ({ message, type = 'success', onClose }) => {
  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
          isSuccess ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
        }`}
      >
        <div className="flex-shrink-0">
          {isSuccess ? (
            <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <FaExclamationCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          )}
        </div>
        <p className={`text-sm font-medium ${
          isSuccess ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
        }`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification; 