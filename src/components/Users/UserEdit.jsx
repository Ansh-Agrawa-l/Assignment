import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to fetch user details. Please try again.');
      navigate('/users');
    } finally {
      setLoading(false);
    }
  }, [axios, id, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!user.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!user.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    try {
      await axios.put(`/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      
      toast.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="flex items-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mr-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
          onClick={() => navigate('/users')}
        >
          ← Back
        </motion.button>
        <h1 className="text-3xl font-bold text-gray-800">Edit User</h1>
      </div>

      <motion.div 
        className="p-8 rounded-xl shadow-lg bg-white"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-center mb-8">
          <motion.img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="first_name">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={user.first_name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="last_name">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={user.last_name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={saving}
              className="py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transform transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserEdit;