import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Loader = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${
        darkMode ? 'border-blue-400' : 'border-blue-600'
      }`}></div>
    </div>
  );
};

export default Loader;