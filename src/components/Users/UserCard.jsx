import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserCard = ({ user, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
      onDelete(user.id);
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={item}
      layout
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="absolute -bottom-16 inset-x-0 flex justify-center">
          <motion.img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            className="w-32 h-32 rounded-full border-4 border-white"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        </div>
      </div>

      <div className="pt-20 p-6 text-center">
        <h3 className="text-xl font-bold mb-1">{`${user.first_name} ${user.last_name}`}</h3>
        <p className="text-sm text-gray-600 mb-4">{user.email}</p>

        <div className="flex justify-center space-x-4 mt-4">
          <Link to={`/users/${user.id}/edit`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300"
              aria-label="Edit user"
            >
              <FaEdit />
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-red-600 hover:bg-red-500 text-white transition-colors duration-300"
            onClick={handleDelete}
            aria-label="Delete user"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;