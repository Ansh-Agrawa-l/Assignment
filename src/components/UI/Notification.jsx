import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const Notification = ({ type, message, onClose, id }) => {
  const { darkMode } = useTheme();
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500 text-xl" />;
      default:
        return <FaInfoCircle className="text-blue-500 text-xl" />;
    }
  };

  const getBackgroundColor = () => {
    if (darkMode) {
      switch (type) {
        case 'success':
          return 'bg-green-900';
        case 'error':
          return 'bg-red-900';
        default:
          return 'bg-blue-900';
      }
    } else {
      switch (type) {
        case 'success':
          return 'bg-green-100';
        case 'error':
          return 'bg-red-100';
        default:
          return 'bg-blue-100';
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`${getBackgroundColor()} p-4 rounded-lg shadow-lg flex items-start mb-4`}
      >
        <div className="mr-3 pt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className={`ml-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          &times;
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;