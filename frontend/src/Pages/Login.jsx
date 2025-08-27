// LoginPage.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import InteractiveBackground from '../Components/AnimatedBackground';
 // Make sure the path is correct

// --- Reusable Floating Label Input with Animated Underline ---
const FloatingLabelInput = ({ type, name, value, onChange, label, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const labelVariants = {
    inactive: { y: 0, scale: 1, color: '#9ca3af' }, // gray-400
    active: { y: -28, scale: 0.85, color: '#c7d2fe' }, // indigo-200
  };

  const underlineVariants = {
    inactive: { scaleX: 0 },
    active: { scaleX: 1 },
  };

  return (
    <div className="relative mt-2">
      <motion.label
        htmlFor={name}
        className="absolute left-0 top-3.5 origin-left pointer-events-none text-base"
        variants={labelVariants}
        animate={isFocused || hasValue ? 'active' : 'inactive'}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3.5 pt-5 bg-transparent border-b-2 outline-none transition-colors duration-300 text-white placeholder-transparent
                   border-gray-600 focus:border-indigo-400"
        required
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400"
        variants={underlineVariants}
        animate={isFocused ? 'active' : 'inactive'}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
};

// --- Main Login Page Component ---
const LoginPage = () => {
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email.';
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true); setApiError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1, scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
    exit: { opacity: 0, y: -5, scale: 0.95 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen  overflow-hidden">
      <InteractiveBackground/>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative  w-full max-w-md mb-20 p-8 bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10"
      >
        <div style={{ transform: 'translateZ(20px)' }}> {/* Push content forward for 3D effect */}
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-white mb-2">
              Welcome Back
            </motion.h2>
            <motion.p variants={itemVariants} className="text-center text-gray-300 mb-8">
              Log in to continue your journey.
            </motion.p>

            <AnimatePresence>
              {apiError && (
                <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="flex items-center justify-center gap-2 p-3 mb-4 text-red-300 bg-red-500/20 rounded-lg text-center font-medium">
                  <ExclamationCircleIcon className="h-5 w-5" />
                  <span>{apiError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 text-white">
              <motion.div variants={itemVariants}>
                <FloatingLabelInput type="email" name="email" value={formData.email} onChange={handleChange} label="Email Address" />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <FloatingLabelInput type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} label="Password" />
                <span className="absolute top-4 right-0 cursor-pointer text-gray-400 hover:text-white transition-colors" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="relative overflow-hidden">
                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white p-3.5 rounded-lg font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 flex items-center justify-center h-[52px]"
                >
                  {/* The button shine effect */}
                  <motion.div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" variants={{ hover: { left: "100%" }}} transition={{ duration: 0.75, ease: "easeOut" }}/>
                  
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div key="loader" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Log In
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>

            <motion.p variants={itemVariants} className="mt-8 text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                Sign Up
              </Link>
            </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;