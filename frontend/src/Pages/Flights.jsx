import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopularDestinations from '../Components/Flights/PopularDestination';
import FeatureHighlight from '../Components/Flights/FeatureHighlight';
import FAQFlight from '../Components/Flights/FAQFlight';
import DestinationCarousel from '../Components/Flights/DestinationCarousel';

import heroImage from '../assets/download.png';

import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { IoCalendarOutline, IoSearch, IoSwapHorizontalOutline } from 'react-icons/io5';

const InputIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-700">
    {children}
  </div>
);

export default function Flights() {
  const navigate = useNavigate();

  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originCode, setOriginCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [departDate, setDepartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [error, setError] = useState('');

  const originTimer = useRef(null);
  const destinationTimer = useRef(null);

  // new states to stop reopening dropdowns after selection
  const [hasSelectedOrigin, setHasSelectedOrigin] = useState(false);
  const [hasSelectedDestination, setHasSelectedDestination] = useState(false);

  const fetchCitySuggestions = async (input, setSuggestions) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestionLoading(true);
    try {
      const res = await axios.get('https://autocomplete.travelpayouts.com/places2', {
        params: { term: input, locale: 'en' },
      });
      setSuggestions(res.data || []);
    } catch (err) {
      console.error('Autocomplete error:', err);
    } finally {
      setSuggestionLoading(false);
    }
  };

  useEffect(() => {
    clearTimeout(originTimer.current);
    if (hasSelectedOrigin) return; // stop reopening
    if (originInput.length < 2) {
      setOriginSuggestions([]);
      return;
    }
    originTimer.current = setTimeout(() => {
      fetchCitySuggestions(originInput, setOriginSuggestions);
    }, 500);
  }, [originInput, hasSelectedOrigin]);

  useEffect(() => {
    clearTimeout(destinationTimer.current);
    if (hasSelectedDestination) return; // stop reopening
    if (destinationInput.length < 2) {
      setDestinationSuggestions([]);
      return;
    }
    destinationTimer.current = setTimeout(() => {
      fetchCitySuggestions(destinationInput, setDestinationSuggestions);
    }, 500);
  }, [destinationInput, hasSelectedDestination]);

  const selectOrigin = (city) => {
    setOriginInput(city.name);
    setOriginCode(city.code);
    setOriginSuggestions([]);
    setHasSelectedOrigin(true); // prevent reopening
  };

  const selectDestination = (city) => {
    setDestinationInput(city.name);
    setDestinationCode(city.code);
    setDestinationSuggestions([]);
    setHasSelectedDestination(true); // prevent reopening
  };

  const handleSwap = () => {
    const tempOriginInput = originInput;
    setOriginInput(destinationInput);
    setDestinationInput(tempOriginInput);

    const tempOriginCode = originCode;
    setOriginCode(destinationCode);
    setDestinationCode(tempOriginCode);

    setOriginSuggestions([]);
    setDestinationSuggestions([]);
    setHasSelectedOrigin(true);
    setHasSelectedDestination(true);
  };

  const handleSearch = () => {
    if (!originCode || !destinationCode || !departDate) {
      setError('Please fill in all fields to continue.');
      return;
    }
    setLoading(true);
    setError('');
    navigate('/flights/results', {
      state: {
        origin: originCode,
        destination: destinationCode,
        depart_date: departDate,
        one_way: true,
        originInput: originInput,
        destinationInput: destinationInput,
      },
    });
    setLoading(false);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-no-repeat bg-[75%_top] md:bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.85) 10%, rgba(255, 255, 255, 0) 70%), 
            url(${heroImage})
          `
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center py-12 md:py-24">
              <div className="max-w-xl">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  Discover the world with our flights.
                </h1>
                <p className="text-lg text-gray-800 mb-8">
                  Your next adventure is just a search away.
                </p>

                <div className="space-y-4">
                  {/* Row 1: From / To */}
                  <div className="grid grid-cols-11 gap-2 items-center">
                    {/* From */}
                    <div className="relative col-span-5">
                      <InputIcon><FaPlaneDeparture /></InputIcon>
                      <input
                        type="text"
                        placeholder="From"
                        value={originInput}
                        onChange={(e) => {
                          setOriginInput(e.target.value);
                          setHasSelectedOrigin(false); // typing again allows suggestions
                        }}
                        className="w-full bg-transparent border-b-2 border-gray-700 pl-10 pr-3 py-2.5 focus:outline-none focus:border-blue-500 transition duration-300"
                      />
                      {!hasSelectedOrigin && originSuggestions.length > 0 && (
                        <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                          {originSuggestions.map((city, i) => (
                            <li key={i} className="p-2 hover:bg-blue-50 cursor-pointer" onClick={() => selectOrigin(city)}>
                              {city.name}, {city.country_name} ({city.code})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Swap Button */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={handleSwap}
                        className="p-2 rounded-full text-gray-700 hover:bg-gray-400/80 hover:text-blue-600 transition-all duration-300"
                        title="Swap origin and destination"
                      >
                        <IoSwapHorizontalOutline size={22} />
                      </button>
                    </div>

                    {/* To */}
                    <div className="relative col-span-5">
                      <InputIcon><FaPlaneArrival /></InputIcon>
                      <input
                        type="text"
                        placeholder="To"
                        value={destinationInput}
                        onChange={(e) => {
                          setDestinationInput(e.target.value);
                          setHasSelectedDestination(false); // typing again allows suggestions
                        }}
                        className="w-full bg-transparent border-b-2 border-gray-700 pl-10 pr-3 py-2.5 focus:outline-none focus:border-blue-500 transition duration-300"
                      />
                      {!hasSelectedDestination && destinationSuggestions.length > 0 && (
                        <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                          {destinationSuggestions.map((city, i) => (
                            <li key={i} className="p-2 hover:bg-blue-50 cursor-pointer" onClick={() => selectDestination(city)}>
                              {city.name}, {city.country_name} ({city.code})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Date / Search */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-grow">
                      <InputIcon><IoCalendarOutline /></InputIcon>
                      <input
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className={`w-full appearance-none bg-transparent border-b-2 border-gray-700 pl-10 pr-3 py-2.5 focus:outline-none focus:border-blue-500 transition duration-300 ${
                          departDate ? 'text-gray-800' : 'text-gray-500'
                        }`}
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      disabled={loading}
                    >
                      {loading ? (
                          <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : (
                        <IoSearch size={24} />
                      )}
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
              </div>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <DestinationCarousel />
        <PopularDestinations />
        <FeatureHighlight />
        <FAQFlight />
      </div>
    </>
  );
}
