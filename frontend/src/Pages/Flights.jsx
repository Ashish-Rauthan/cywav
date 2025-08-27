import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopularDestinations from '../Components/Flights/PopularDestination';
import FeatureHighlight from '../Components/Flights/FeatureHighlight';
import FAQFlight from '../Components/Flights/FAQFlight';
import DestinationCarousel from '../Components/Flights/DestinationCarousel';

// Importing your local image from the 'src/assets' folder.
import heroImage from '../assets/download.jpeg';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

const InputIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    {children}
  </div>
);

export default function Flights() {
  const navigate = useNavigate();

  // States
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
    if (originInput.length < 2) return setOriginSuggestions([]);
    originTimer.current = setTimeout(() => {
      fetchCitySuggestions(originInput, setOriginSuggestions);
    }, 500);
  }, [originInput]);

  useEffect(() => {
    clearTimeout(destinationTimer.current);
    if (destinationInput.length < 2) return setDestinationSuggestions([]);
    destinationTimer.current = setTimeout(() => {
      fetchCitySuggestions(destinationInput, setDestinationSuggestions);
    }, 500);
  }, [destinationInput]);

  const selectOrigin = (city) => {
    setOriginInput(`${city.name}, ${city.country_name}`);
    setOriginCode(city.code);
    setOriginSuggestions([]);
  };

  const selectDestination = (city) => {
    setDestinationInput(`${city.name}, ${city.country_name}`);
    setDestinationCode(city.code);
    setDestinationSuggestions([]);
  };

  const handleSearch = () => {
    if (!originCode || !destinationCode || !departDate) {
      setError('Please fill in Origin, Destination, and Departure Date.');
      return;
    }
    setLoading(true);
    setError('');
    navigate('/flights/results', {
      state: {
        origin: originCode,
        destination: destinationCode,
        depart_date: departDate,
        one_way: true, // Always true since we removed the toggle
        originInput: originInput,
        destinationInput: destinationInput,
      },
    });
    setLoading(false);
  };

  return (
    <>
      {/* Full-page background */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-black/40 min-h-screen px-4 py-12 md:py-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Find And Book
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              A Great Experience
            </h2>
          </div>

          {/* Flight Search Box */}
          <div className="max-w-6xl w-full mx-auto rounded-2xl shadow-xl overflow-hidden relative bg-white/70 ">
            <div className="relative p-8 pt-16 z-10">
              <h3 className="text-2xl font-bold mb-1 text-gray-800">
                Find Your Next Flight
              </h3>
              <p className="text-gray-600 mb-6">Enter your travel details to begin.</p>

              {/* Inputs grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* From input */}
                <div className="relative">
                  <InputIcon>
                    <FaPlaneDeparture />
                  </InputIcon>
                  <input
                    type="text"
                    placeholder="From"
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    className="w-full border-gray-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  />
                  {suggestionLoading && originSuggestions.length === 0 && (
                    <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">⏳</div>
                  )}
                  {originSuggestions.length > 0 && (
                    <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                      {originSuggestions.map((city, i) => (
                        <li
                          key={i}
                          className="p-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => selectOrigin(city)}
                        >
                          {city.name}, {city.country_name} ({city.code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* To input */}
                <div className="relative">
                  <InputIcon>
                    <FaPlaneArrival />
                  </InputIcon>
                  <input
                    type="text"
                    placeholder="To"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    className="w-full border-gray-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  />
                  {suggestionLoading && destinationSuggestions.length === 0 && (
                    <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">⏳</div>
                  )}
                  {destinationSuggestions.length > 0 && (
                    <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                      {destinationSuggestions.map((city, i) => (
                        <li
                          key={i}
                          className="p-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => selectDestination(city)}
                        >
                          {city.name}, {city.country_name} ({city.code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Depart */}
                <div className="relative">
                  <InputIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </InputIcon>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full border-gray-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  />
                </div>
              </div>

              {/* Search button */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-semibold cursor-pointer"
                  style={{ backgroundColor: 'oklch(54.6% 0.245 262.881)' }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>{' '}
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>{' '}
                      Search Flights
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other sections (white background) */}
      <div className="bg-white">
        <DestinationCarousel />
        <PopularDestinations />
        <FeatureHighlight />
        <FAQFlight />
      </div>
    </>
  );
}