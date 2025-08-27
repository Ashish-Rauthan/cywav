import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// --- Star Component ---
// A small, reusable component for a single twinkling star.
const Star = ({ size, x, y, duration }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
    }}
    animate={{
      opacity: [0.1, 1, 0.1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// --- Main Interactive Background Component ---
const InteractiveBackground = () => {
  // 1. Mouse Position Tracking
  // We use useMotionValue to track mouse position without causing re-renders.
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // 2. Parallax Transformations
  // We transform the mouse position into a smaller range of movement for each blob.
  // This creates a parallax effect, giving a sense of depth.
  const blob1X = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [-100, 100]);
  const blob1Y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [-100, 100]);
  const blob2X = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [50, -50]);
  const blob2Y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [50, -50]);
  const blob3X = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [-50, 50]);
  const blob3Y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [100, -100]);

  // 3. Generate Stars
  // useMemo ensures we only generate the stars once, improving performance.
  const numStars = 50;
  const stars = useMemo(() => {
    return Array.from({ length: numStars }).map(() => ({
      size: Math.random() * 2 + 1, // Star size between 1px and 3px
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 2, // Twinkle duration between 2s and 4s
    }));
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
      {/* Star Field */}
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}
      
      {/* The interactive, morphing blobs */}
      <motion.div
        className="absolute w-[550px] h-[550px] bg-purple-600 opacity-30 filter blur-3xl"
        style={{ x: blob1X, y: blob1Y, top: '-20%', left: '-20%' }}
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-indigo-600 opacity-20 filter blur-3xl"
        style={{ x: blob2X, y: blob2Y, bottom: '-30%', right: '-25%' }}
        animate={{
          borderRadius: [
            "40% 60% 60% 40% / 70% 50% 50% 30%",
            "20% 80% 40% 60% / 60% 30% 70% 40%",
            "40% 60% 60% 40% / 70% 50% 50% 30%",
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: 5,
        }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] bg-teal-500 opacity-20 filter blur-3xl"
        style={{ x: blob3X, y: blob3Y, bottom: '5%', left: '10%' }}
        animate={{
          borderRadius: [
            "50% 50% 30% 70% / 60% 40% 60% 40%",
            "50% 50% 70% 30% / 40% 60% 40% 60%",
            "50% 50% 30% 70% / 60% 40% 60% 40%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
};

export default InteractiveBackground;