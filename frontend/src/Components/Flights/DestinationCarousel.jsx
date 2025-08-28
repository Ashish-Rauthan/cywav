import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

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

// === API Base URL (from your example) ===
const API_BASE = import.meta.env.VITE_API_BASE || "https://cywav.onrender.com";

// --- DATA: The hardcoded 'price' is no longer needed as we'll fetch it live ---
const FLIGHT_DESTINATIONS = {
  'Domestic Deals': [
    { id: 1, name: 'Thiruvananthapuram, Kerala', code: 'TRV', origin: 'DEL', image: thiru },
    { id: 2, name: 'Mumbai, Maharashtra', code: 'BOM', origin: 'DEL', image: bom },
    { id: 3, name: 'Pune, Maharashtra', code: 'PNQ', origin: 'DEL', image: pune },
    { id: 4, name: 'Leh, Ladakh', code: 'IXL', origin: 'DEL', image: leh },
    { id: 5, name: 'Kolkata, West Bengal', code: 'CCU', origin: 'DEL', image: kol },
    { id: 6, name: 'Chennai, Tamil Nadu', code: 'MAA', origin: 'DEL', image: chen },
    { id: 7, name: 'Ahmedabad, Gujarat', code: 'AMD', origin: 'DEL', image: guj },
  ],
  'International Deals': [
    { id: 8, name: 'Dubai, UAE', code: 'DXB', origin: 'DEL', image: dub },
    { id: 9, name: 'Singapore', code: 'SIN', origin: 'DEL', image: sing },
    { id: 10, name: 'Bangkok, Thailand', code: 'BKK', origin: 'DEL', image: bang },
    { id: 11, name: 'London, UK', code: 'LHR', origin: 'DEL', image: lon },
  ],
};

const FlightDealsGrid = () => {
  const [activeTab, setActiveTab] = useState('Domestic Deals');
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

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-7xl mx-auto">
        
        <div className="flex items-center justify-start flex-wrap gap-4 sm:gap-6 mb-6 text-gray-700 font-medium">
          {/* Guarantees Header ... */}
          <div className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /><span>Best Price Guarantee</span></div>
          <div className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /><span>Secure Booking</span></div>
          <div className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /><span>24/7 Customer Support</span></div>
        </div>

        <div className="flex border-b border-gray-200">
          {/* Tabs ... */}
          {Object.keys(FLIGHT_DESTINATIONS).map((tabName) => (
            <button key={tabName} onClick={() => setActiveTab(tabName)} className={`cursor-pointer px-5 py-3 text-base font-semibold transition-colors duration-200 ${activeTab === tabName ? 'bg-black text-white rounded-t-md' : 'bg-transparent text-gray-800'}`}>{tabName}</button>
          ))}
        </div>

        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <AnimatePresence>
            {FLIGHT_DESTINATIONS[activeTab].map((dest) => {
              // Get live data for this specific destination
              const livePrice = prices[dest.code];
              const err = errors[dest.code];
              
              return (
                <motion.div
                  key={dest.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col"
                  onClick={() => handleDiscoverTrips(dest)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                >
                  <div className="w-full h-48 overflow-hidden">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{dest.name}</h3>
                    <div className="mt-auto text-right">
                      <span className="text-sm text-gray-500">Flights from </span>
                      <p className="text-2xl font-bold text-gray-900 min-h-[32px]">
                        {/* ✅ Conditional Price Display */}
                        {loading && !livePrice && !err
                          ? <span className="text-base text-gray-500 animate-pulse">Fetching…</span>
                          : err
                          ? <span className="text-base text-red-500">Not Avail.</span>
                          : <span className="text-blue-600">₹{Number(livePrice).toLocaleString('en-IN')}</span>
                        }
                      </p>
                    </div>
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