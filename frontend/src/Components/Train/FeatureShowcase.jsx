// src/components/FeatureShowcase.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaWifi, FaCoffee, FaMountain } from 'react-icons/fa';

const features = [
  {
    icon: <FaWifi className="text-4xl text-blue-400" />,
    title: 'Free Wi-Fi',
    description: 'Stay connected throughout your journey with our high-speed internet.',
  },
  {
    icon: <FaCoffee className="text-4xl text-yellow-400" />,
    title: 'Onboard Dining',
    description: 'Enjoy delicious meals and snacks from our extensive menu.',
  },
  {
    icon: <FaMountain className="text-4xl text-green-400" />,
    title: 'Scenic Views',
    description: 'Travel through breathtaking landscapes and beautiful scenery.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const FeatureShowcase = () => {
  return (
    <div className="py-20 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Our Premium Services</h2>
      <motion.div
        className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg text-center"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeatureShowcase;