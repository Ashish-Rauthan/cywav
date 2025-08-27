import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiStar, FiMapPin, FiChevronDown } from 'react-icons/fi';

// --- DUMMY DATA ---
const HOTELS = [
  { id: 1, name: 'The Celestial', location: 'Aurora Heights', price: 480, rating: 5.0, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { id: 2, name: 'Aqua Vista Resort', location: 'Coral Bay', price: 320, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { id: 3, name: 'The Gilded Arch', location: 'Solara City', price: 275, rating: 4.6, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { id: 4, name: 'Zenith Mountain Lodge', location: 'Whispering Peaks', price: 390, rating: 4.9, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80' },
  { id: 5, name: 'Crimson Bloom Hotel', location: 'Sakura Valley', price: 240, rating: 4.7, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80' },
];

const cardInfoVariants = {
    offscreen: { opacity: 0, y: 30 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 1.2,
            staggerChildren: 0.1,
        }
    }
};

// Sub-component for a single hotel card
const HotelCard = ({ hotel, i, progress, range, targetScale }) => {
    const scale = useTransform(progress, range, [1, targetScale]);
    const isActive = progress >= range[0] && progress < range[1];

    return (
        <motion.div 
            style={{ 
                scale, 
                top: `calc(10% + ${i * 5}vh)`,
                willChange: 'transform'
            }} 
            className="sticky w-10/12 max-w-4xl mx-auto h-[70vh] rounded-3xl overflow-hidden"
        >
            <div className="relative w-full h-full">
                <img src={hotel.image} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>

                <motion.div 
                    className="absolute bottom-0 left-0 w-full p-8 text-white"
                    initial="offscreen"
                    animate={isActive ? "onscreen" : "offscreen"}
                    variants={cardInfoVariants}
                >
                    <motion.h3 variants={cardInfoVariants} className="text-4xl lg:text-6xl font-black">{hotel.name}</motion.h3>
                    <motion.div variants={cardInfoVariants} className="flex items-center space-x-2 mt-2 text-slate-200">
                        <FiMapPin />
                        <span>{hotel.location}</span>
                    </motion.div>

                    <motion.div variants={cardInfoVariants} className="mt-6 flex justify-between items-end">
                        <div className="flex items-center space-x-2 text-3xl text-amber-400">
                            <FiStar className="fill-current"/>
                            <span className="text-white font-bold">{hotel.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-300 text-sm">from</p>
                            <p className="text-4xl font-bold">${hotel.price}</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Main Component
const ChronoScrollHotelShowcase = () => {
  const targetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // useScroll gives us scrollYProgress, a value from 0 to 1
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'] // Track scroll from start of target to end of target
  });

  // Effect to update the active index based on scroll progress
  useEffect(() => {
    return scrollYProgress.onChange(latest => {
      const newIndex = Math.floor(latest * HOTELS.length);
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress]);

  return (
    <div ref={targetRef} className="relative bg-black" style={{ height: `${HOTELS.length * 100}vh` }}>

      {/* 1. Immersive Backgrounds */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {HOTELS.map((hotel, i) => {
          // Calculate opacity range for each background
          const start = i / HOTELS.length;
          const end = (i + 1) / HOTELS.length;
          const opacity = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0]);
          
          return (
            <motion.div key={hotel.id} style={{ opacity }} className="absolute inset-0">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          );
        })}
      </div>

      {/* 2. Hotel Card Stack */}
      <div className="relative z-10 -mt-[100vh]">
        {HOTELS.map((hotel, i) => {
          const targetScale = 1 - ((HOTELS.length - 1 - i) * 0.05);
          const range = [i / HOTELS.length, (i + 1) / HOTELS.length];
          return <HotelCard key={hotel.id} hotel={hotel} i={i} progress={scrollYProgress} range={range} targetScale={targetScale} />;
        })}
      </div>

      {/* 3. Side Timeline/Pagination */}
      <div className="sticky top-1/2 -translate-y-1/2 left-4 md:left-8 w-8 h-auto z-20 flex flex-col items-center space-y-4">
        {HOTELS.map((_, i) => (
          <div key={i} className="relative">
            <div className={`w-2 h-2 rounded-full transition-colors ${activeIndex === i ? 'bg-white' : 'bg-white/30'}`} />
            {activeIndex === i && (
              <motion.div 
                layoutId="timeline-glow"
                className="absolute -inset-2 border-2 border-white rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* 4. "Scroll to Explore" Hint */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1 text-white/70"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      >
        <span>Scroll to Explore</span>
        <FiChevronDown />
      </motion.div>
    </div>
  );
};

export default ChronoScrollHotelShowcase;