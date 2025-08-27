// src/Components/Bus/BusTravelPerks.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FiWifi, FiBatteryCharging, FiVideo, FiWind } from 'react-icons/fi';

const perks = [
  { icon: <FiWifi size={32} />, name: 'Free WiFi', description: 'Stay connected on the go' },
  { icon: <FiBatteryCharging size={32} />, name: 'Power Outlets', description: 'Keep your devices charged' },
  { icon: <FiVideo size={32} />, name: 'On-board Entertainment', description: 'Movies & shows' },
  { icon: <FiWind size={32} />, name: 'Air Conditioned', description: 'Travel in comfort' },
];

const BusTravelPerks = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="my-16 max-w-7xl mx-auto px-4">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        Travel with Unmatched Comfort
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((perk, i) => (
          <motion.div
            key={perk.name}
            className="relative p-6 bg-white border border-slate-200 rounded-xl overflow-hidden text-center cursor-pointer"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            whileHover={{ y: -8, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
            viewport={{ once: true, amount: 0.5 }}
            custom={i}
          >
            <div className="relative z-10">
              <div className="text-white bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
                {perk.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{perk.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{perk.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BusTravelPerks;