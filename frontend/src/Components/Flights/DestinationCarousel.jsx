import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import thiru from '../../assets/thiru.jpg';
import bom from '../../assets/bom.jpg';
import pune from '../../assets/pune.jpg';
import leh from '../../assets/leh.jpg';
import kol from '../../assets/kol.jpg';
import chen from '../../assets/chen.jpg';
import guj from '../../assets/guj.jpg';

// --- DATA (Added IATA codes for navigation) ---
const DESTINATIONS = [
  {
    id: 1,
    name: 'Thiruvananthapuram, Kerala',
    code: 'TRV',
    description: 'The "City of Lord Anantha," a coastal capital city known for its ancient temples, colonial architecture, and pristine beaches.',
    image: thiru,
    accentColor: '#fe4b1fff',
  },
  {
    id: 2,
    name: 'Mumbai, Maharashtra',
    code: 'BOM',
    description: 'A cosmopolitan metropolis, financial capital, and the heart of the Bollywood film industry.',
    image: bom,
    accentColor: '#298bbfff',
  },
  {
    id: 3,
    name: 'Pune, Maharashtra',
    code: 'PNQ',
    description: 'A blend of city life and calmness, known for its historical landmarks and vibrant festivals.',
    image: pune,
    accentColor: '#40c9deff',
  },
  {
    id: 4,
    name: 'Leh',
    code: 'IXL',
    description: 'A high-altitude desert surrounded by the Himalayas, known for its dramatic landscapes and ancient monasteries.',
    image: leh,
    accentColor: '#f9b241ff',
  },
  {
    id: 5,
    name: 'Kolkata, West Bengal',
    code: 'CCU',
    description: 'The "City of Joy," famous for its rich history, art, and intellectual traditions.',
    image: kol,
    accentColor: '#4A90E2',
  },
  {
    id: 6,
    name: 'Chennai, Tamil Nadu',
    code: 'MAA',
    description: 'Gateway to South India, known for its Tamil traditions and ancient temples.',
    image: chen,
    accentColor: '#f9b858ff',
  },
  {
    id: 7,
    name: 'Ahmedabad, Gujarat',
    code: 'AMD',
    description: 'The historic city and a textile hub, famous for its intricate architecture, vibrant street food, and rich cultural heritage.',
    image: guj,
    accentColor: '#57f6d3ff',
  },
];

// --- 1. Main Component ---
const DestinationCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleDiscoverTrips = (destination) => {
    navigate('/flights/results', {
      state: {
        origin: 'DEL', // default origin (Delhi)
        destination: destination.code,
        depart_date: new Date().toISOString().split('T')[0], // today’s date
        one_way: true,
        originInput: 'New Delhi, India',
        destinationInput: destination.name,
        currency: 'inr',
      },
    });
  };

  const activeDestination = DESTINATIONS[activeIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      {/* Dynamic Background Blob */}
      <motion.div
        key={activeDestination.id}
        className="absolute inset-0 z-0 opacity-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          background: `radial-gradient(circle, ${activeDestination.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-12">
        {/* Left Side: Destination List */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center md:text-left text-white/90">
            Choose Your <span className="text-zinc-500">Next</span> Adventure
          </h2>
          <div className="flex flex-col  w-full">
            {DESTINATIONS.map((dest, index) => (
              <motion.div
                key={dest.id}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors duration-300 ${
                  activeIndex === index ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: activeIndex === index ? dest.accentColor : 'transparent' }}
                >
                  <FiMapPin />
                </div>
                <div>
                  <h4 className={`text-xl font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-white/70'}`}>
                    {dest.name}
                  </h4>
                 
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Featured Card */}
        <div className="relative mt-25 w-full md:w-2/3 h-[500px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDestination.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative w-full h-full">
                {/* Image */}
                <img
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay and Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                  {/* Title and Description with Staggered Reveal */}
                  <div className="overflow-hidden">
                    <motion.h3
                      className="text-4xl md:text-5xl font-bold text-white mb-2"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                    >
                      {activeDestination.name}
                    </motion.h3>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      className="text-white/80 text-lg mb-4"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    >
                      {activeDestination.description}
                    </motion.p>
                  </div>

                  {/* Button */}
                  <motion.button
                    onClick={() => handleDiscoverTrips(activeDestination)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 self-start cursor-pointer"
                    style={{ backgroundColor: activeDestination.accentColor }}
                    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${activeDestination.accentColor}50` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Discover Trips</span>
                    <FiArrowUpRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DestinationCarousel;