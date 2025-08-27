import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // <-- NEW: Import axios for API calls
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(''); // <-- NEW: State for API errors
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
    setApiError(''); // Clear API error on user input
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirming your password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => { // <-- MODIFIED: Made the function async
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setApiError(''); // Clear any previous API errors

    if (Object.keys(validationErrors).length === 0) {
      try {
        // <-- NEW: Make a POST request to your backend
        const res = await axios.post('http://localhost:5000/api/auth/signup', {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        console.log('Signup successful:', res.data);
        
        // Redirect to the login page on successful signup
        navigate('/login');

      } catch (err) {
        // <-- NEW: Handle errors from the backend
        console.error('Signup failed:', err.response?.data?.message);
        setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    }
  };

  const inputVariants = {
    initial: { scale: 1, boxShadow: '0px 0px 0px #000' },
    hover: { scale: 1.02, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' },
    focus: { scale: 1.02, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: '0px 0px 0px #000' },
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 20px rgba(79, 70, 229, 0.4)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <p className="text-center text-gray-500 mb-8">Join us and start your journey!</p>
        
        {/* <-- NEW: Display API errors from the backend */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg text-center"
          >
            {apiError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <motion.div variants={inputVariants} initial="initial" whileHover="hover" className="rounded-lg shadow-md">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                required
              />
            </motion.div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <motion.div variants={inputVariants} initial="initial" whileHover="hover" className="rounded-lg shadow-md">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                required
              />
            </motion.div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <motion.div variants={inputVariants} initial="initial" whileHover="hover" className="rounded-lg shadow-md">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                required
              />
            </motion.div>
            <span
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="relative">
            <motion.div variants={inputVariants} initial="initial" whileHover="hover" className="rounded-lg shadow-md">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                required
              />
            </motion.div>
            <span
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <motion.button
            type="submit"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-indigo-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupForm;