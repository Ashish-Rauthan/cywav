// src/components/RouteVisualizer.jsx

import React from 'react';
import { motion } from 'framer-motion';

const RouteVisualizer = ({ from = 'City A', to = 'City B' }) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const trainVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: '100%',
      transition: {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className="py-20 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Popular Route: {from} to {to}</h2>
      <div className="container mx-auto px-4 flex items-center justify-center relative">
        <div className="absolute left-1/4 -translate-x-1/2 top-1/2 transform -translate-y-1/2 text-2xl font-bold">{from}</div>
        <div className="absolute right-1/4 translate-x-1/2 top-1/2 transform -translate-y-1/2 text-2xl font-bold">{to}</div>

        <motion.div
          className="w-full max-w-4xl h-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* SVG for the route line */}
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 800 100"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0"
          >
            <motion.path
              d="M 100 50 C 300 10 500 90 700 50"
              stroke="#60a5fa"
              strokeWidth="4"
              fill="none"
              variants={lineVariants}
            />
          </motion.svg>

          {/* Animated Train Icon */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2"
            variants={trainVariants}
            style={{ width: '40px', height: '40px' }}
          >
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white"
            >
              {/* Simple train icon */}
              <rect x="10" y="30" width="80" height="40" rx="5" fill="currentColor" />
              <rect x="25" y="40" width="15" height="20" fill="#60a5fa" />
              <rect x="60" y="40" width="15" height="20" fill="#60a5fa" />
              <circle cx="30" cy="75" r="10" fill="#4b5563" />
              <circle cx="70" cy="75" r="10" fill="#4b5563" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RouteVisualizer;