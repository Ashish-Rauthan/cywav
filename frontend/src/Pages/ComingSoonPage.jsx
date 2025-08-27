import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Optional: If you want to use react-icons for social media
// import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const ComingSoonPage = ({ featureName = "This Feature" }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate an API call (replace with your actual subscription logic)
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Subscribed with email: ${email}`);
      setMessage('Thanks for subscribing! We\'ll notify you when we launch.');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  // Variants for floating background elements - more diverse movements
  const floatVariants = (delay = 0, duration = 8, shape = 'circle') => ({
    animate: {
      y: ["-8%", "8%", "-8%"], // More pronounced vertical float
      x: ["-6%", "6%", "-6%"], // More pronounced horizontal float
      rotate: shape === 'circle' ? [0, 360] : (shape === 'square' ? [0, 90, 180, 270, 360] : [0, 10, -10, 0]), // Varied rotation
      scale: [0.95, 1.05, 0.95], // Subtle pulsating scale
      transition: {
        repeat: Infinity,
        duration: duration,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-gradient {
            /* Revised professional and eye-pleasing cool/subtle palette */
            background: linear-gradient(-45deg, #F0F4F8, #E3F2FD, #D1C4E9, #BBDEFB, #9FA8DA, #A7D9FF);
            background-size: 400% 400%;
            animation: gradientAnimation 25s ease infinite; /* Slower and more mesmerizing */
          }
        `}
      </style>
      <div className="relative animated-gradient flex items-center justify-center min-h-screen p-4 text-gray-900 overflow-hidden">
        {/* Decorative Floating Elements (background) - Adjusted colors and blur levels */}
        <motion.div
          className="absolute top-[8%] left-[12%] w-48 h-48 bg-blue-200/40 rounded-full filter blur-4xl z-10"
          variants={floatVariants(0, 15, 'circle')}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-[10%] right-[8%] w-64 h-64 bg-purple-200/40 rounded-full filter blur-5xl z-10"
          variants={floatVariants(1, 18, 'circle')}
          animate="animate"
        />
        <motion.div
          className="absolute top-[25%] right-[18%] w-40 h-40 bg-indigo-200/40 rounded-xl filter blur-4xl z-10"
          variants={floatVariants(0.7, 13, 'square')}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-[3%] left-[7%] w-72 h-36 bg-gray-200/40 rounded-br-full rounded-tl-full filter blur-5xl z-10"
          variants={floatVariants(2, 20, 'ellipse')}
          animate="animate"
        />
         <motion.div
          className="absolute top-[5%] right-[5%] w-36 h-36 bg-blue-200/40 rounded-full filter blur-4xl z-10"
          variants={floatVariants(1.5, 11, 'circle')}
          animate="animate"
        />
         <motion.div
          className="absolute bottom-[20%] left-[25%] w-28 h-28 bg-purple-200/40 rounded-xl filter blur-4xl z-10"
          variants={floatVariants(2.5, 14, 'square')}
          animate="animate"
        />
         <motion.div
          className="absolute top-[60%] left-[10%] w-32 h-32 bg-indigo-200/30 rounded-full filter blur-3xl z-10"
          variants={floatVariants(3, 16, 'circle')}
          animate="animate"
        />
         <motion.div
          className="absolute bottom-[50%] right-[5%] w-20 h-20 bg-gray-200/30 rounded-full filter blur-3xl z-10"
          variants={floatVariants(0.3, 9, 'circle')}
          animate="animate"
        />


        <motion.div
          className="relative z-20 text-center p-8 md:p-12 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl mx-auto border border-white/50" /* Glassmorphism here */
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-indigo-800 mb-4">
              Coming Soon!
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 font-semibold">
              {featureName} is almost here!
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 mb-10">
            <p className="text-md md:text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
              We're meticulously crafting an exceptional experience for you. Get ready for seamless bookings and unforgettable journeys.
            </p>
          </motion.div>

          {/* Interactive Notify Me Section */}
        

          {/* Optional: Social Media Links */}
          {/*
          <motion.div variants={itemVariants} className="mt-12 text-gray-700">
            <p className="text-md mb-4">Follow us for updates:</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-2xl" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-200 text-2xl" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors duration-200 text-2xl" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </motion.div>
          */}
        </motion.div>
      </div>
    </>
  );
};

export default ComingSoonPage;