import React, { useRef, useEffect } from 'react';

// This is a dedicated component for the canvas animation to keep code organized.
const AuroraCanvas = () => {
  const canvasRef = useRef(null);

  // The main useEffect hook that sets up and runs the entire animation.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    // --- Particle & Ribbon Classes: The core of the generative logic ---

    // A single star particle
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 0.5 + 0.5;
        this.vy = Math.random() * 0.1 + 0.05;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.y += this.vy;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // A ribbon of light for the aurora
    class AuroraRibbon {
      constructor(color, amplitude) {
        this.color = color;
        this.particles = [];
        this.y = canvas.height * Math.random();
        this.amplitude = amplitude;
        this.frequency = 0.01 + Math.random() * 0.01;
        this.speed = 0.005;
        this.phase = Math.random() * Math.PI * 2;
      }
      update() {
        // Create new particles at the top
        for (let i = 0; i < 2; i++) {
          this.particles.push({
            x: Math.random() * canvas.width,
            y: 0,
            life: 1,
            vx: (Math.random() - 0.5) * 0.5,
          });
        }

        // Update each particle in the ribbon
        this.particles.forEach((p, i) => {
          const angle = (p.x * this.frequency) + this.phase + (mouse.y / canvas.height) * 2;
          p.y += (this.amplitude * Math.sin(angle)) / 20 + 1;
          p.x += p.vx;
          p.life -= 0.005;

          if (p.life <= 0) {
            this.particles.splice(i, 1);
          }
        });
        this.phase += this.speed;
      }
      draw() {
        this.particles.forEach(p => {
          ctx.fillStyle = `rgba(${this.color}, ${p.life * 0.1})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    // --- Initialization and Animation Loop ---
    let stars = [];
    let ribbons = [];
    function init() {
      stars = [];
      ribbons = [];
      for (let i = 0; i < 300; i++) {
        stars.push(new Star());
      }
      ribbons.push(new AuroraRibbon('4, 120, 87', 50)); // Green
      ribbons.push(new AuroraRibbon('76, 201, 240', 70)); // Blueish
      ribbons.push(new AuroraRibbon('129, 140, 248', 60)); // Indigo
    }

    function animate() {
      // Create the trailing effect by not clearing the whole canvas
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => { s.update(); s.draw(); });
      ribbons.forEach(r => { r.update(); r.draw(); });

      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    // --- Event Listeners for Interactivity ---
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Re-initialize particles on resize
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup function to stop animation and remove listeners when component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};


// --- Main exported component with the UI ---
export default function AuroraSearch() {
  return (
    <div className="relative h-screen w-full bg-gray-900 overflow-hidden">
      <style>{`
        @keyframes subtle-glow {
          0%, 100% { box-shadow: 0 0 15px 0px rgba(52, 211, 153, 0.3); }
          50% { box-shadow: 0 0 25px 5px rgba(52, 211, 153, 0.5); }
        }
        .glow-button {
          animation: subtle-glow 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* The advanced animation canvas lives in the background */}
      <AuroraCanvas />

      {/* The UI sits on top, with a semi-transparent background to let the visuals show through */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold"
          style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Find Your Next Adventure
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-xl text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Tell us your destination, and let the journey begin.
        </motion.p>
        
        <motion.div 
          className="mt-8 w-full max-w-xl flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
        >
          <input
            type="text"
            placeholder="e.g., 'Flights to Iceland'"
            className="w-full px-6 py-4 bg-gray-800/50 text-white placeholder-gray-400 backdrop-blur-sm rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          />
          <button className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-white font-bold rounded-full glow-button transition-transform hover:scale-105 shrink-0">
            Search
          </button>
        </motion.div>
      </div>
    </div>
  );
}