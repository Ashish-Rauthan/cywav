// src/pages/Bus.jsx

import { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // For a real API

// Import your new bus-specific components
import PopularBusRoutes from '../Components/Bus/PopularBusRoutes';
import BusOperatorHighlight from '../Components/Bus/BusOperatorHighlight';
import BusTravelPerks from '../Components/Bus/BusTravelPerks';
import FAQBus from '../Components/Bus/FAQBus';

// An icon component for the inputs
const InputIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    {children}
  </div>
);

// MOCK DATA for Autocomplete (replace with a real API)
const MOCK_CITIES = [
  { name: 'New York', state: 'NY' }, { name: 'Los Angeles', state: 'CA' }, { name: 'Chicago', state: 'IL' },
  { name: 'Houston', state: 'TX' }, { name: 'Phoenix', state: 'AZ' }, { name: 'Philadelphia', state: 'PA' },
  { name: 'San Antonio', state: 'TX' }, { name: 'San Diego', state: 'CA' }, { name: 'Dallas', state: 'TX' },
  { name: 'San Jose', state: 'CA' }, { name: 'Boston', state: 'MA' }, { name: 'Las Vegas', state: 'NV' },
  { name: 'Miami', state: 'FL' }, { name: 'Atlanta', state: 'GA' }, { name: 'Washington', state: 'DC' }
];

export default function Bus() {
  // State management for inputs
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [journeyDate, setJourneyDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [error, setError] = useState('');

  // Refs for debouncing
  const originTimer = useRef(null);
  const destinationTimer = useRef(null);

  // MOCK Autocomplete function
  const fetchCitySuggestions = (input, setSuggestions) => {
    setSuggestionLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (input.length < 1) {
        setSuggestions([]);
        setSuggestionLoading(false);
        return;
      }
      const filteredCities = MOCK_CITIES.filter(city =>
        city.name.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredCities);
      setSuggestionLoading(false);
    }, 400); // 400ms delay to feel real
  };
  
  // useEffect hooks to trigger autocomplete with debounce
  useEffect(() => {
    clearTimeout(originTimer.current);
    originTimer.current = setTimeout(() => {
      fetchCitySuggestions(originInput, setOriginSuggestions);
    }, 500);
  }, [originInput]);

  useEffect(() => {
    clearTimeout(destinationTimer.current);
    destinationTimer.current = setTimeout(() => {
      fetchCitySuggestions(destinationInput, setDestinationSuggestions);
    }, 500);
  }, [destinationInput]);

  // Handlers for selecting a city
  const selectOrigin = (city) => {
    setOriginInput(`${city.name}, ${city.state}`);
    setOriginSuggestions([]);
  };

  const selectDestination = (city) => {
    setDestinationInput(`${city.name}, ${city.state}`);
    setDestinationSuggestions([]);
  };

  const handleSearch = () => {
    if (!originInput || !destinationInput || !journeyDate) {
      setError('Please fill in Origin, Destination, and Journey Date.');
      return;
    }
    setLoading(true);
    setError('');
    
    // In a real app, you would navigate or call an API here
    console.log('Searching for buses with:', {
      origin: originInput,
      destination: destinationInput,
      date: journeyDate,
    });
    
    // Simulate search and then stop loading
    setTimeout(() => {
      setLoading(false);
      // Example of navigation:
      // navigate('/bus/results', { state: { ... } });
    }, 1500);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 text-slate-800 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto mt-20">
          <div className="bg-white backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30 mb-8">
            <h1 className="text-4xl font-bold mb-2 text-slate-900">Book Your Bus Journey</h1>
            <p className="text-slate-600 mb-6">Affordable and comfortable travel on wheels.</p>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* From */}
              <div className="relative">
                 <InputIcon>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                 </InputIcon>
                 <input type="text" placeholder="Leaving from" value={originInput} onChange={(e) => setOriginInput(e.target.value)} className="w-full border-slate-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                 {suggestionLoading && originSuggestions.length === 0 && <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">⏳</div>}
                 {originSuggestions.length > 0 && (
                   <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                     {originSuggestions.map((city, i) => (
                       <li key={i} className="p-2 hover:bg-blue-50 cursor-pointer" onClick={() => selectOrigin(city)}>
                         {city.name}, {city.state}
                       </li>
                     ))}
                   </ul>
                 )}
              </div>
              {/* To */}
              <div className="relative">
                <InputIcon>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                </InputIcon>
                <input type="text" placeholder="Going to" value={destinationInput} onChange={(e) => setDestinationInput(e.target.value)} className="w-full border-slate-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                {suggestionLoading && destinationSuggestions.length === 0 && <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">⏳</div>}
                {destinationSuggestions.length > 0 && (
                   <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                   {destinationSuggestions.map((city, i) => (
                     <li key={i} className="p-2 hover:bg-blue-50 cursor-pointer" onClick={() => selectDestination(city)}>
                       {city.name}, {city.state}
                     </li>
                   ))}
                 </ul>
               )}
              </div>
              {/* Date */}
              <div className="relative">
                <InputIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></InputIcon>
                <input type="date" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} className="w-full border-slate-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition"/>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={handleSearch} className="w-full sm:w-auto bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 text-white px-10 py-3 rounded-lg hover:from-blue-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-semibold" disabled={loading}>
                {loading ? (
                  <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Searching...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    Search Buses
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Additional Bus Components --- */}
      <div className="py-2"> {/* Added padding for spacing */}
        <BusTravelPerks />
        <PopularBusRoutes />
        <BusOperatorHighlight />
        <FAQBus />
      </div>
    </>
  );
}