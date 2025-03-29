import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Modal = ({ isOpen, onClose, children, title }) => {
  const { darkMode } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`fixed inset-x-0 top-[50%] translate-y-[-50%] mx-auto max-w-md p-6 rounded-xl shadow-xl z-50 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {title && (
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;