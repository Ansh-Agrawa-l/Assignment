import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }

  return (
    <motion.nav 
      className="py-4 px-6 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/users">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="font-bold text-2xl text-blue-500"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
            >
              EmployWise
            </motion.span>
            <span className="font-light text-gray-600">Manager</span>
          </motion.div>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
              onClick={logout}
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;