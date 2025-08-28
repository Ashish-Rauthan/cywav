import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import heroImage from '../assets/download.png'; // Ensure this is the correct high-quality hero image
// --- ICONS (Matching the previous component's style) ---
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { IoCalendarOutline, IoSearch } from 'react-icons/io5';

// --- Helper Components ---
const InputIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
    {children}
  </div>
);
const FlightTimeline = ({ origin, destination, stops }) => {
  const stopDots = Array.from({ length: stops }, (_, i) => (
    <div key={i} className="w-2 h-2 bg-slate-400 rounded-full"></div>
  ));
  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white"></div>
        <p className="text-sm font-bold text-slate-700 mt-1">{origin}</p>
      </div>
      <div className="flex-grow flex items-center justify-center gap-x-2 mx-2 border-b-2 border-slate-300 border-dashed">
        {stops > 0 ? stopDots : <div className="w-full h-[2px] bg-slate-300"></div>}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
        <p className="text-sm font-bold text-slate-700 mt-1">{destination}</p>
      </div>
    </div>
  );
};
// --- Main Data & Configuration ---
const AIRLINE_NAMES = {
  SU: 'Aeroflot', EK: 'Emirates', TK: 'Turkish Airlines', LH: 'Lufthansa', BA: 'British Airways', AF: 'Air France',
  DL: 'Delta Air Lines', AA: 'American Airlines', UA: 'United Airlines', JL: 'Japan Airlines', NH: 'All Nippon Airways',
  SQ: 'Singapore Airlines', CX: 'Cathay Pacific', QF: 'Qantas', LY: 'El Al', AC: 'Air Canada', WN: 'Southwest Airlines',
  AS: 'Alaska Airlines', B6: 'JetBlue Airways', F9: 'Frontier Airlines', G4: 'Allegiant Air', HA: 'Hawaiian Airlines',
  NK: 'Spirit Airlines', VY: 'Vueling', IB: 'Iberia', AY: 'Finnair', KL: 'KLM Royal Dutch Airlines', QR: 'Qatar Airways',
  EY: 'Etihad Airways', BR: 'EVA Air', CI: 'China Airlines', CA: 'Air China', MU: 'China Eastern Airlines',
  CZ: 'China Southern Airlines', KE: 'Korean Air', OZ: 'Asiana Airlines', TG: 'Thai Airways', AI: 'Air India',
  ET: 'Ethiopian Airlines', SA: 'South African Airways', MS: 'EgyptAir', SV: 'Saudia',
};
export default function FlightResults() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originCode, setOriginCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [departDate, setDepartDate] = useState('');
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchingAlternativeDates, setSearchingAlternativeDates] = useState(false);
  const [alternativeDateSuggestions, setAlternativeDateSuggestions] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [airlineFilter, setAirlineFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stopsFilter, setStopsFilter] = useState('any');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const originTimer = useRef(null);
  const destinationTimer = useRef(null);
  
  // FIX: Add state to control dropdown visibility
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  
  // Use useCallback to memoize searchFlights function
  const searchFlights = useCallback(async (
    currentOriginCode,
    currentDestinationCode,
    currentDepartDate,
  ) => {
    if (!currentOriginCode || !currentDestinationCode || !currentDepartDate) {
      setError('Please fill in Origin, Destination, and Departure Date.');
      setResults([]);
      return;
    }
    setLoading(true);
    setResults([]);
    setError('');
    setAlternativeDateSuggestions([]);
    try {
      const res = await axios.get('https://cywav.onrender.com/api/flights/search', {
        params: {
          origin: currentOriginCode,
          destination: currentDestinationCode,
          depart_date: currentDepartDate,
          one_way: true,
        },
      });
      if (res.data.data?.length > 0) {
        setResults(res.data.data);
      } else {
        setError('No flights found for the selected route and dates.');
        searchAlternativeDates(currentOriginCode, currentDestinationCode, currentDepartDate);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching flight data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is only created once
  
  // New useEffect to handle URL parameters on load and refresh
  useEffect(() => {
    // FIX: Close dropdowns when component mounts
    setShowOriginDropdown(false);
    setShowDestinationDropdown(false);
    
    const params = new URLSearchParams(location.search);
    const origin = params.get('origin');
    const destination = params.get('destination');
    const depart_date = params.get('depart_date');
    const originInput = params.get('origin_input');
    const destinationInput = params.get('destination_input');
    if (origin && destination && depart_date && originInput && destinationInput) {
      setOriginCode(origin);
      setDestinationCode(destination);
      setDepartDate(depart_date);
      setOriginInput(originInput);
      setDestinationInput(destinationInput);
      searchFlights(origin, destination, depart_date);
    } else if (location.state) {
      // Fallback to location.state for initial navigation (from Home page)
      const { origin: stateOrigin, destination: stateDestination, depart_date: stateDepartDate, originInput: stateOriginInput, destinationInput: stateDestinationInput } = location.state;
      setOriginCode(stateOrigin || '');
      setDestinationCode(stateDestination || '');
      setDepartDate(stateDepartDate || '');
      setOriginInput(stateOriginInput || '');
      setDestinationInput(stateDestinationInput || '');
      if (stateOrigin && stateDestination && stateDepartDate) {
        searchFlights(stateOrigin, stateDestination, stateDepartDate);
      }
    }
  }, [location.search, location.state, searchFlights]);
  
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
    if (originInput.length < 2) {
      setOriginSuggestions([]);
      return;
    }
    originTimer.current = setTimeout(() => {
      fetchCitySuggestions(originInput, setOriginSuggestions);
    }, 500);
  }, [originInput]);
  
  useEffect(() => {
    clearTimeout(destinationTimer.current);
    if (destinationInput.length < 2) {
      setDestinationSuggestions([]);
      return;
    }
    destinationTimer.current = setTimeout(() => {
      fetchCitySuggestions(destinationInput, setDestinationSuggestions);
    }, 500);
  }, [destinationInput]);
  
  const selectOrigin = (city) => {
    setOriginInput(`${city.name}, ${city.country_name}`);
    setOriginCode(city.code);
    setOriginSuggestions([]);
    // FIX: Close dropdown after selection
    setShowOriginDropdown(false);
  };
  
  const selectDestination = (city) => {
    setDestinationInput(`${city.name}, ${city.country_name}`);
    setDestinationCode(city.code);
    setDestinationSuggestions([]);
    // FIX: Close dropdown after selection
    setShowDestinationDropdown(false);
  };
  
  const searchAlternativeDates = async (origin, destination, originalDate, daysToCheck = 7) => {
    setSearchingAlternativeDates(true);
    setAlternativeDateSuggestions([]);
    const datesToCheck = [];
    const originalDateObj = new Date(originalDate);
    for (let i = 1; i <= daysToCheck; i++) {
      const nextDate = new Date(originalDateObj);
      nextDate.setDate(originalDateObj.getDate() + i);
      datesToCheck.push(nextDate.toISOString().split('T')[0]);
    }
    for (let i = 1; i <= daysToCheck; i++) {
      const prevDate = new Date(originalDateObj);
      prevDate.setDate(originalDateObj.getDate() - i);
      datesToCheck.push(prevDate.toISOString().split('T')[0]);
    }
    datesToCheck.sort((a, b) => new Date(a) - new Date(b));
    const availableDates = [];
    for (const date of datesToCheck) {
      try {
        const res = await axios.get('https://cywav.onrender.com/api/flights/search', {
          params: {
            origin: origin,
            destination: destination,
            depart_date: date,
            one_way: true,
          },
        });
        if (res.data.data?.length > 0) {
          availableDates.push({
            date: date,
            formattedDate: new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
            price: Math.min(...res.data.data.map(f => f.price)),
            flightCount: res.data.data.length
          });
          if (availableDates.length >= 3) break;
        }
      } catch (err) {
        console.error(`Error checking date ${date}:`, err);
      }
    }
    setAlternativeDateSuggestions(availableDates);
    setSearchingAlternativeDates(false);
  };
  
  const handleMainSearch = () => {
    // FIX: Close dropdowns before search
    setShowOriginDropdown(false);
    setShowDestinationDropdown(false);
    
    if (originCode && destinationCode && departDate) {
      // Update URL with new search parameters
      navigate(`?origin=${originCode}&destination=${destinationCode}&depart_date=${departDate}&origin_input=${encodeURIComponent(originInput)}&destination_input=${encodeURIComponent(destinationInput)}`);
    } else {
      setError('Please fill in all search fields.');
    }
  };
  
  const getAirlineName = (code) => {
    return AIRLINE_NAMES[code] || code || 'Unknown Airline';
  };
  
  const filteredResults = results
    .map(flight => ({
      ...flight,
      airlineName: getAirlineName(flight.airline),
      stops: flight.transfers || 0
    }))
    .filter((flight) => {
      const price = flight.price || 0;
      const airlineMatch = airlineFilter ? flight.airlineName.toLowerCase().includes(airlineFilter.toLowerCase()) : true;
      const priceMinMatch = minPrice ? price >= parseFloat(minPrice) : true;
      const priceMaxMatch = maxPrice ? price <= parseFloat(maxPrice) : true;
      let stopsMatch = true;
      switch (stopsFilter) {
        case 'direct': stopsMatch = flight.stops === 0; break;
        case '1': stopsMatch = flight.stops === 1; break;
        case '2+': stopsMatch = flight.stops >= 2; break;
        default: stopsMatch = true;
      }
      return airlineMatch && priceMinMatch && priceMaxMatch && stopsMatch;
    })
    .sort((a, b) => {
      let compareValue = 0;
      switch (sortBy) {
        case 'price': compareValue = a.price - b.price; break;
        case 'departure': compareValue = new Date(a.departure_at) - new Date(b.departure_at); break;
        case 'duration': compareValue = (a.duration || 0) - (b.duration || 0); break;
        default: compareValue = 0;
      }
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });
  
  const toggleSortOrder = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const getSortIndicator = (field) => {
    if (sortBy !== field) return '';
    return sortOrder === 'asc' ? '↑' : '↓';
  };
  
  const useAlternativeDate = (date) => {
    // FIX: Close dropdowns before changing date
    setShowOriginDropdown(false);
    setShowDestinationDropdown(false);
    
    // Update URL to trigger new search
    navigate(`?origin=${originCode}&destination=${destinationCode}&depart_date=${date}&origin_input=${encodeURIComponent(originInput)}&destination_input=${encodeURIComponent(destinationInput)}`);
  };
  
  return (
    <div className="min-h-screen bg-slate-100">
      {/* === UPDATED SEARCH PANEL SECTION WITH MOBILE ADJUSTMENTS === */}
      <div
        className="bg-cover bg-no-repeat bg-[75%_top] md:bg-center pt-20 pb-12 md:py-16 mb-8" // Adjusted vertical padding for mobile
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0) 70%),
            url(${heroImage})
          `
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight"> {/* Adjusted heading size for mobile */}
              Find Your Next Flight
            </h1>
            <p className="text-md md:text-lg text-gray-700 mb-6"> {/* Adjusted subtitle size for mobile */}
              Modify your travel details to find the perfect flight.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {/* From */}
                <div className="relative">
                  <InputIcon><FaPlaneDeparture /></InputIcon>
                  <input
                    type="text"
                    placeholder="From"
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    onFocus={() => {
                      setShowOriginDropdown(true);
                      fetchCitySuggestions(originInput, setOriginSuggestions);
                    }}
                    onBlur={() => {
                      // Delay closing to allow click on suggestion
                      setTimeout(() => setShowOriginDropdown(false), 200);
                    }}
                    className="w-full bg-transparent border-b-2 border-gray-700 pl-10 pr-3 py-2.5 focus:outline-none focus:border-blue-500 transition duration-300"
                  />
                  {showOriginDropdown && originSuggestions.length > 0 && (
                    <ul className="absolute bg-white text-black border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                      {originSuggestions.map((city, i) => (
                        <li key={i} className="p-2 hover:bg-blue-50 cursor-pointer" onClick={() => selectOrigin(city)}>
                          {city.name}, {city.country_name} ({city.code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* To */}
                <div className="relative">
                  <InputIcon><FaPlaneArrival /></InputIcon>
                  <input
                    type="text"
                    placeholder="To"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    onFocus={() => {
                      setShowDestinationDropdown(true);
                      fetchCitySuggestions(destinationInput, setDestinationSuggestions);
                    }}
                    onBlur={() => {
                      // Delay closing to allow click on suggestion
                      setTimeout(() => setShowDestinationDropdown(false), 200);
                    }}
                    className="w-full bg-transparent border-b-2 border-gray-700 pl-10 pr-3 py-2.5 focus:outline-none focus:border-blue-500 transition duration-300"
                  />
                  {showDestinationDropdown && destinationSuggestions.length > 0 && (
                    <ul className="absolute bg-white text-black border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                      {destinationSuggestions.map((city, i) => (
                        <li key={i} className="p-2 hover:bg-blue-50 cursor-pointer" onClick={() => selectDestination(city)}>
                          {city.name}, {city.country_name} ({city.code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
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
                  onClick={handleMainSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-semibold" // Adjusted button padding for mobile
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                      <span className="hidden sm:inline">Searching...</span>
                    </>
                  ) : (
                    <>
                      <IoSearch size={20} />
                      <span className="hidden sm:inline">Search Flights</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area below the search form */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
          }
        `}</style>
        <h1 className="text-4xl font-bold mb-2 text-slate-800">Flight Results</h1>
        {(originInput && destinationInput && departDate) && (
          <p className="text-slate-600 mb-6">
            Flights from <span className="font-semibold">{originInput}</span> to <span className="font-semibold">{destinationInput}</span> on <span className="font-semibold">{new Date(departDate).toLocaleDateString('en-GB')}</span>
          </p>
        )}
        <div className="lg:hidden mb-4">
          <button onClick={() => setIsFilterVisible(!isFilterVisible)} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 7a1 1 0 10-2 0v4.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V7zM17 9a1 1 0 10-2 0v2.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V9z" /></svg>
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-medium">{error}</p>
            {searchingAlternativeDates && (
              <div className="mt-4 text-center">
                <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-slate-700">Searching for alternative dates...</p>
              </div>
            )}
            {alternativeDateSuggestions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Flights available on these dates:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {alternativeDateSuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
                      <p className="font-bold text-slate-800">{suggestion.formattedDate}</p>
                      <p className="text-sm text-slate-600 mt-1">{suggestion.flightCount} flight{suggestion.flightCount > 1 ? 's' : ''} available</p>
                      <p className="text-lg font-bold text-blue-600 mt-2">From ₹{suggestion.price}</p>
                      <button
                        onClick={() => useAlternativeDate(suggestion.date)}
                        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Select This Date
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="mt-4 text-xl font-semibold text-slate-700">Searching for flights...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* FILTERS SIDEBAR */}
            <div className={`lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 self-start lg:sticky lg:top-8 ${isFilterVisible ? 'block' : 'hidden'} lg:block`}>
              <h3 className="text-2xl font-semibold mb-6 text-slate-900">Filter & Sort</h3>
              <div className="space-y-6">
                {/* Airline Filter */}
                <div>
                  <label htmlFor="airline-filter" className="block text-slate-700 font-medium mb-2">Airline</label>
                  <input
                    type="text"
                    id="airline-filter"
                    placeholder="Filter by airline"
                    value={airlineFilter}
                    onChange={(e) => setAirlineFilter(e.target.value)}
                    className="w-full border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                {/* Price Range */}
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Price Range (₹)</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-1/2 border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-1/2 border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      min="0"
                    />
                  </div>
                </div>
                {/* Number of Stops */}
                <div>
                  <label htmlFor="stops-filter" className="block text-slate-700 font-medium mb-2">Stops</label>
                  <select
                    id="stops-filter"
                    value={stopsFilter}
                    onChange={(e) => setStopsFilter(e.target.value)}
                    className="w-full border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="any">Any Stops</option>
                    <option value="direct">Direct</option>
                    <option value="1">1 stop</option>
                    <option value="2+">2+ stops</option>
                  </select>
                </div>
                {/* Sort By */}
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Sort By</label>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => toggleSortOrder('price')} className={`px-4 py-2 text-sm rounded-md transition-colors font-semibold ${sortBy === 'price' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>Price {getSortIndicator('price')}</button>
                    <button onClick={() => toggleSortOrder('departure')} className={`px-4 py-2 text-sm rounded-md transition-colors font-semibold ${sortBy === 'departure' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>Departure {getSortIndicator('departure')}</button>
                    <button onClick={() => toggleSortOrder('duration')} className={`px-4 py-2 text-sm rounded-md transition-colors font-semibold ${sortBy === 'duration' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>Duration {getSortIndicator('duration')}</button>
                  </div>
                </div>
              </div>
            </div>
            {/* FLIGHT RESULTS LIST */}
            <div className="lg:w-3/4 space-y-6">
              {filteredResults.length > 0 && (
                <div className="text-slate-600 font-medium">
                  Showing {filteredResults.length} of {results.length} flights
                </div>
              )}
              {filteredResults.map((flight, i) => (
                <div
                  key={flight.link || i}
                  className="animate-fadeInUp bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row group"
                  style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
                >
                  {/* Left Part: Airline Info */}
                  <div className="p-4 md:p-6 bg-slate-50 md:w-1/4 flex md:flex-col items-center md:items-start justify-center text-center md:text-left">
                    <img
                      src={`https://content.airhex.com/content/logos/airlines_${flight.airline}_50_50_s.png`}
                      alt={`${flight.airlineName} logo`}
                      className="w-12 h-12 rounded-full border border-slate-200 mr-4 md:mr-0 md:mb-3"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-lg">{flight.airlineName}</p>
                      <p className="text-sm text-slate-500">Flight {flight.flight_number || 'N/A'}</p>
                    </div>
                  </div>
                  {/* Middle Part: Journey Details */}
                  <div className="flex-grow p-4 md:p-6">
                    <div className="mb-4">
                      <FlightTimeline
                        origin={originInput || flight.origin}
                        destination={destinationInput || flight.destination}
                        stops={flight.stops}
                      /></div>
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-800 text-lg">{new Date(flight.departure_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>{new Date(flight.departure_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-800">
                          {flight.duration ? `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m` : 'N/A'}
                        </p>
                        <p className="text-blue-600 font-medium">
                          {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-lg">{new Date(new Date(flight.departure_at).getTime() + flight.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>{new Date(new Date(flight.departure_at).getTime() + flight.duration * 60000).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                  {/* Right Part: Price & Booking */}
                  <div className="bg-slate-50 md:bg-white p-4 md:p-6 md:border-l border-slate-200 flex md:flex-col items-center justify-between md:justify-center gap-4 text-center">
                    <div className="mb-0 md:mb-4">
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="text-3xl font-bold text-slate-800">₹{flight.price}</p>
                    </div>
                    {flight.link && (
                      <a
                        href={`https://www.aviasales.com${flight.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto md:w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold text-base"
                      >
                        Book Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {filteredResults.length === 0 && results.length > 0 && !loading && (
                <div className="mt-8 text-center py-12 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="mt-4 text-xl font-bold text-slate-700">No flights match your filter criteria.</p>
                  <p className="text-slate-500 mt-2">Try adjusting your filters or sorting options.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}