import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';


const FlightBanner = () => {
  // You can easily change the background image by replacing the URL below.
  // Use a high-quality, landscape-oriented image for best results.
  const backgroundImageUrl = 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <>
      {/* 
        Custom CSS keyframes for our animations. 
        Placing them in a <style> tag here makes the component self-contained.
      */}
      <style>
        {`
          @keyframes kenBurns {
            0% {
              transform: scale(1.05) translate(0, 0);
            }
            50% {
              transform: scale(1.1) translate(-1%, 1%);
            }
            100% {
              transform: scale(1.05) translate(0, 0);
            }
          }
          .animate-ken-burns {
            animation: kenBurns 30s ease-in-out infinite;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          @keyframes flyAcross {
            0% {
              left: -10%;
              transform: translateY(0) rotate(-15deg);
              opacity: 0.8;
            }
            20% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
              left: 110%;
              transform: translateY(-20px) rotate(10deg);
              opacity: 0;
            }
          }
          .animate-fly-across {
            animation: flyAcross 8s linear infinite;
          }
        `}
      </style>

      {/* Main Banner Container */}
      <div className="relative pt-10 mt-10 h-[80vh] min-h-[450px] w-full overflow-hidden  shadow-2xl ">
        
        {/* Background Image with Ken Burns Effect */}
        <img
          src={backgroundImageUrl}
          alt="Airplane wing in the clouds"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>

        {/* Animated Airplane Icon */}
        <div 
          className="absolute top-[20%] animate-fly-across text-white/80"
          style={{ animationDelay: '1.5s' }} // Start flying after the text has appeared
        >
          <FaPaperPlane size={30} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          
          {/* Main Heading */}
          <h1 
            className="animate-fade-in-up text-5xl md:text-7xl font-extrabold tracking-tight"
            style={{ opacity: 0 }} // Start hidden, animation will make it visible
          >
            Start Your Journey
          </h1>

          {/* Subheading */}
          <p 
            className="animate-fade-in-up mt-4 max-w-2xl text-lg md:text-xl text-gray-200"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Discover and book cheap flights to your favorite destinations around the world. Your next adventure is just a search away.
          </p>

          {/* Call-to-Action Button */}
          <a
            href="#" // Link to your search form section
            className="animate-fade-in-up mt-8 inline-block rounded-full bg-blue-600 px-10 py-4 font-semibold text-white shadow-lg transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            Find Flights Now
          </a>
        </div>
      </div>
    </>
  );
};

export default FlightBanner;