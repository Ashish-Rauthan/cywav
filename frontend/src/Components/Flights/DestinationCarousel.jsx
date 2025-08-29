import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiX, FiMapPin, FiStar } from 'react-icons/fi';

// --- Assets ---
import thiru from '../../assets/thiru.jpg';
import bom from '../../assets/bom.jpg';
import pune from '../../assets/pune.jpg';
import leh from '../../assets/leh.jpg';
import kol from '../../assets/kol.jpg';
import chen from '../../assets/chen.jpg';
import guj from '../../assets/guj.jpg';
import dub from '../../assets/dub.jpg';
import sing from '../../assets/sing.jpg';
import bang from '../../assets/bang.jpg';
import lon from '../../assets/lon.jpg';
import hyd from '../../assets/hyd.jpg';

// === API Base URL (from your example) ===
const API_BASE = import.meta.env.VITE_API_BASE || "https://cywav.onrender.com";

// --- DATA: The hardcoded 'price' is no longer needed as we'll fetch it live ---
const FLIGHT_DESTINATIONS = {
  'Domestic Deals': [
    { 
      id: 1, 
      name: 'Thiruvananthapuram, Kerala', 
      code: 'TRV', 
      origin: 'DEL', 
      image: thiru,
      description: 'Experience the serene backwaters and pristine beaches of Kerala\'s capital. Known for its rich cultural heritage and delicious cuisine.',
      highlights: ['Backwater tours', 'Beach resorts', 'Ayurvedic spas', 'Traditional Kathakali performances'],
      rating: 4.7
    },
    { 
      id: 2, 
      name: 'Mumbai, Maharashtra', 
      code: 'BOM', 
      origin: 'DEL', 
      image: bom,
      description: 'The bustling financial capital of India, known for its vibrant nightlife, Bollywood, and street food.',
      highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Bollywood tours'],
      rating: 4.6
    },
    { 
      id: 3, 
      name: 'Pune, Maharashtra', 
      code: 'PNQ', 
      origin: 'DEL', 
      image: pune,
      description: 'A vibrant city blending history with modernity, known for its educational institutions and pleasant climate.',
      highlights: ['Ag Khan Palace', 'Shaniwar Wada', 'Sinhagad Fort', 'Osho Ashram'],
      rating: 4.5
    },
    { 
      id: 4, 
      name: 'Leh, Ladakh', 
      code: 'IXL', 
      origin: 'DEL', 
      image: leh,
      description: 'A breathtaking destination with stunning landscapes, monasteries, and adventure sports opportunities.',
      highlights: ['Pangong Lake', 'Nubra Valley', 'Thiksey Monastery', 'Khardung La Pass'],
      rating: 4.9
    },
    { 
      id: 5, 
      name: 'Kolkata, West Bengal', 
      code: 'CCU', 
      origin: 'DEL', 
      image: kol,
      description: 'The cultural capital of India, known for its colonial architecture, art galleries, and delicious sweets.',
      highlights: ['Victoria Memorial', 'Howrah Bridge', 'Indian Museum', 'Durga Puja festival'],
      rating: 4.4
    },
    { 
      id: 6, 
      name: 'Chennai, Tamil Nadu', 
      code: 'MAA', 
      origin: 'DEL', 
      image: chen,
      description: 'A gateway to South India with beautiful temples, sandy beaches, and rich cultural heritage.',
      highlights: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George', 'Chennai Music Season'],
      rating: 4.3
    },
    { 
      id: 7, 
      name: 'Ahmedabad, Gujarat', 
      code: 'AMD', 
      origin: 'DEL', 
      image: guj,
      description: 'A city with deep historical roots, known for its textile industry and mouth-watering vegetarian cuisine.',
      highlights: ['Sabarmati Ashram', 'Adalaj Stepwell', 'Kankaria Lake', 'Akshardham Temple'],
      rating: 4.5
    },
        { 
      id: 8, 
      name: 'Hyderabad, Telangana', 
      code: 'HYD', 
      origin: 'DEL', 
      image: hyd,
      description: 'The capital of Telangana, famously known as the "City of Pearls." Hyderabad is a vibrant blend of history and modernity, renowned for its rich Nizami heritage, iconic landmarks, and world-famous biryani',
      highlights: ['Charminar', 'Golconda Fort', 'Hussain Sagar Lake', 'Ramoji Film City'],
      rating: 4.5
    },
  ],
  'International Deals': [
    { 
      id: 8, 
      name: 'Dubai, UAE', 
      code: 'DXB', 
      origin: 'DEL', 
      image: dub,
      description: 'A futuristic city known for luxury shopping, ultramodern architecture, and vibrant nightlife. Home to the world\'s tallest building.',
      highlights: ['Burj Khalifa', 'Desert safaris', 'Luxury shopping', 'Artificial islands'],
      rating: 4.8
    },
    { 
      id: 9, 
      name: 'Singapore', 
      code: 'SIN', 
      origin: 'DEL', 
      image: sing,
      description: 'A global financial hub with a tropical climate and multicultural population. Known for its cleanliness and efficiency.',
      highlights: ['Marina Bay Sands', 'Gardens by the Bay', 'Universal Studios', 'Sentosa Island'],
      rating: 4.7
    },
    { 
      id: 10, 
      name: 'Bangkok, Thailand', 
      code: 'BKK', 
      origin: 'DEL', 
      image: bang,
      description: 'A vibrant city known for ornate shrines, bustling street life, and delectable street food.',
      highlights: ['Grand Palace', 'Floating markets', 'Chao Phraya River', 'Thai massage'],
      rating: 4.6
    },
    { 
      id: 11, 
      name: 'London, UK', 
      code: 'LHR', 
      origin: 'DEL', 
      image: lon,
      description: 'A historic city with iconic landmarks, world-class museums, and diverse cultural offerings.',
      highlights: ['Big Ben', 'Tower Bridge', 'British Museum', 'West End theaters'],
      rating: 4.7
    },
  ],
};

const FlightDealsGrid = () => {
  const [activeTab, setActiveTab] = useState('Domestic Deals');
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();
  
  // === START: Logic copied and adapted from PopularDestinations ===
  // ✅ Price, Loading, and Error State
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  
  // ✅ Local YYYY-MM-DD formatter
  const formatLocalYMD = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  
  const tomorrowStr = (() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return formatLocalYMD(t);
  })();
  
  // ✅ useEffect to fetch all prices on component mount
  useEffect(() => {
    const controller = new AbortController();
    
    // Combine all destinations into a single array for fetching
    const allDestinations = [
      ...FLIGHT_DESTINATIONS['Domestic Deals'],
      ...FLIGHT_DESTINATIONS['International Deals']
    ];
    
    const fetchAll = async () => {
      try {
        const requests = allDestinations.map((d) =>
          fetch(
            `${API_BASE}/api/flights/search?origin=${encodeURIComponent(d.origin)}&destination=${encodeURIComponent(d.code)}&depart_date=${encodeURIComponent(tomorrowStr)}&one_way=true`,
            { signal: controller.signal }
          ).then((r) => r.json()).catch((e) => ({ error: e?.message || 'Network error' }))
        );
        
        const results = await Promise.all(requests);
        const priceMap = {};
        const errMap = {};
        
        results.forEach((res, i) => {
          const code = allDestinations[i].code;
          if (res?.success && Array.isArray(res.data)) {
            const minPrice = res.data.reduce((min, f) => {
              const p = Number(f?.price ?? f?.value ?? Infinity);
              return isFinite(p) && p < min ? p : min;
            }, Infinity);
            
            if (isFinite(minPrice)) {
              priceMap[code] = minPrice;
            } else {
              errMap[code] = 'No fares';
            }
          } else {
            errMap[code] = res?.error || 'API error';
          }
        });
        
        setPrices(priceMap);
        setErrors(errMap);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAll();
    return () => controller.abort();
  }, []); // run once
  // === END: Logic from PopularDestinations ===

  const handleDiscoverTrips = (destination) => {
    navigate('/flights/results', {
      state: {
        origin: 'DEL',
        destination: destination.code,
        depart_date: tomorrowStr,
        one_way: true,
        originInput: 'New Delhi, India',
        destinationInput: destination.name,
        currency: 'inr',
      },
    });
  };

  const handleCardClick = (destination) => {
    if (expandedCard === destination.id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(destination.id);
    }
  };

  const handleBookNow = (e, destination) => {
    e.stopPropagation();
    handleDiscoverTrips(destination);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-start flex-wrap gap-4 sm:gap-6 mb-6 text-gray-700 font-medium">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            <span>Secure Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            <span>24/7 Customer Support</span>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200">
          {Object.keys(FLIGHT_DESTINATIONS).map((tabName) => (
            <button 
              key={tabName} 
              onClick={() => {
                setActiveTab(tabName);
                setExpandedCard(null); // Reset expanded card when switching tabs
              }}
              className={`cursor-pointer px-5 py-3 text-base font-semibold transition-colors duration-200 ${
                activeTab === tabName 
                  ? 'bg-black text-white rounded-t-md' 
                  : 'bg-transparent text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tabName}
            </button>
          ))}
        </div>
        
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {FLIGHT_DESTINATIONS[activeTab].map((dest) => {
              const isExpanded = expandedCard === dest.id;
              const livePrice = prices[dest.code];
              const err = errors[dest.code];
              
              return (
                <motion.div
                  key={dest.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col ${
                    isExpanded ? 'lg:col-span-2 row-span-2' : ''
                  }`}
                  onClick={() => handleCardClick(dest)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    height: isExpanded ? 'auto' : 'auto'
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={!isExpanded ? { 
                    y: -5, 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
                  } : {}}
                >
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{dest.name}</h3>
                      {isExpanded && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiX size={20} />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <FiMapPin className="text-gray-500 mr-1" size={14} />
                      <span className="text-sm text-gray-600">{dest.code}</span>
                      <div className="flex items-center ml-auto">
                        <FiStar className="text-yellow-500 mr-1" size={14} />
                        <span className="text-sm font-medium">{dest.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto text-right">
                      <span className="text-sm text-gray-500">Flights from </span>
                      <p className="text-2xl font-bold text-gray-900 min-h-[32px]">
                        {loading && !livePrice && !err
                          ? <span className="text-base text-gray-500 animate-pulse">Fetching…</span>
                          : err
                          ? <span className="text-base text-red-500">Not Available</span>
                          : <span className="text-blue-600">₹{Number(livePrice).toLocaleString('en-IN')}</span>
                        }
                      </p>
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">About this destination</h4>
                            <p className="text-gray-600 text-sm mb-4">{dest.description}</p>
                            
                            <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
                            <ul className="text-gray-600 text-sm mb-4">
                              {dest.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-center mb-1">
                                  <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" size={14} />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                            
                            <button
                              onClick={(e) => handleBookNow(e, dest)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center mt-2"
                            >
                              Book Now <FiArrowRight className="ml-2" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FlightDealsGrid;