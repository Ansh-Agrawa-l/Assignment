import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';

const baseURL = 'https://reqres.in/api';

export const useAxios = () => {
  const { token, logout } = useAuth();
  const [axiosInstance] = useState(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          toast.error('Session expired. Please log in again.');
          logout();
        }
        return Promise.reject(error);
      }
    );

    return instance;
  });

  useEffect(() => {
    axiosInstance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [token, axiosInstance]);

  return axiosInstance;
};
