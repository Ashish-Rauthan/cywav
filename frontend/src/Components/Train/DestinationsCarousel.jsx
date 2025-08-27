import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const destinations = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1616147427181-426c11762c95?q=80&w=1932&auto=format&fit=crop',
    title: 'Himalayan Queen',
    description: 'A breathtaking journey through the scenic mountains of Shimla.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596752044810-ac3b9d3c52e4?q=80&w=1932&auto=format&fit=crop',
    title: 'Deccan Odyssey',
    description: 'Experience a luxurious journey through the rich history of Maharashtra.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1597554988081-3317789f6d62?q=80&w=1965&auto=format&fit=crop',
    title: 'Konkan Railway',
    description: 'Travel along India\'s western coast, witnessing beautiful seascapes and greenery.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1599857999849-c16c61f22492?q=80&w=1964&auto=format&fit=crop',
    title: 'Maharajas\' Express',
    description: 'A regal and unforgettable tour of North India\'s majestic palaces.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1582298687714-d021c1f440a7?q=80&w=1964&auto=format&fit=crop',
    title: 'Darjeeling Himalayan Railway',
    description: 'A nostalgic toy train ride through the beautiful tea gardens of Darjeeling.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardStackVariants = (i, activeIndex, direction) => {
  const position = i - activeIndex;
  let zIndex = destinations.length - Math.abs(position);
  let scale = 1 - Math.abs(position) * 0.1;
  let x = position * 50;

  if (Math.abs(position) >= 2) {
    x = position > 0 ? 100 : -100;
    scale = 0.8;
  }
  if (i === activeIndex) {
    scale = 1.1;
    x = 0;
    zIndex = destinations.length;
  }

  return {
    initial: {
      x: x * direction,
      scale: scale * 0.9,
      opacity: 0,
      zIndex,
    },
    animate: {
      x,
      scale,
      opacity: 1,
      zIndex,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      x: x * direction,
      scale: scale * 0.9,
      opacity: 0,
      zIndex,
      transition: {
        duration: 0.4,
      },
    },
  };
};

const InteractiveCardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <div className="bg-gray-950 py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-indigo-950 opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px]">
        <h2 className="text-4xl font-extrabold text-white text-center mb-16">Explore Iconic Indian Journeys</h2>
        
        <div className="relative w-full max-w-lg h-[450px]">
          <AnimatePresence custom={direction}>
            {destinations.map((destination, i) => (
              <motion.div
                key={destination.id}
                className="absolute inset-0 cursor-pointer"
                variants={cardStackVariants(i, activeIndex, direction)}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  pointerEvents: i === activeIndex ? 'auto' : 'none',
                }}
              >
                <div className="w-full h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-3/5 object-cover object-center"
                  />
                  <div className="p-6 text-white text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2 text-indigo-400">{destination.title}</h3>
                    <p className="text-gray-300">{destination.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-16 flex items-center space-x-6">
          <motion.button
            onClick={prevSlide}
            className="p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-all shadow-lg"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="text-xl" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-all shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="text-xl" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCardCarousel;