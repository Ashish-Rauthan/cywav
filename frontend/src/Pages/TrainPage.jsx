import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeatureShowcase from "../Components/Train/FeatureShowcase";
import RouteVisualizer from "../Components/Train/RouteVisualizer";
import InteractiveCardCarousel from "../Components/Train/DestinationsCarousel";
import FAQTrain from "../Components/Train/FAQTrain";



const InputIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    {children}
  </div>
);

export default function TrainPage() {
  const navigate = useNavigate();

  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [journeyDate, setJourneyDate] = useState("");
  const [trainClass, setTrainClass] = useState("SL"); // Sleeper default
  const [quota, setQuota] = useState("GN"); // General default
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [error, setError] = useState("");

  const originTimer = useRef(null);
  const destinationTimer = useRef(null);

  // Fetch station suggestions
  const fetchStationSuggestions = async (input, setSuggestions) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestionLoading(true);
    try {
      // Replace with your real station autocomplete API
      const res = await axios.get("https://api.railwayapi.site/autocomplete", {
        params: { query: input },
      });
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Station autocomplete error:", err);
    } finally {
      setSuggestionLoading(false);
    }
  };

  useEffect(() => {
    clearTimeout(originTimer.current);
    if (originInput.length < 2) return setOriginSuggestions([]);
    originTimer.current = setTimeout(() => {
      fetchStationSuggestions(originInput, setOriginSuggestions);
    }, 400);
  }, [originInput]);

  useEffect(() => {
    clearTimeout(destinationTimer.current);
    if (destinationInput.length < 2) return setDestinationSuggestions([]);
    destinationTimer.current = setTimeout(() => {
      fetchStationSuggestions(destinationInput, setDestinationSuggestions);
    }, 400);
  }, [destinationInput]);

  const selectOrigin = (station) => {
    setOriginInput(`${station.name}, ${station.state}`);
    setOriginCode(station.code);
    setOriginSuggestions([]);
  };

  const selectDestination = (station) => {
    setDestinationInput(`${station.name}, ${station.state}`);
    setDestinationCode(station.code);
    setDestinationSuggestions([]);
  };

  const handleSearch = () => {
    if (!originCode || !destinationCode || !journeyDate) {
      setError("Please fill in Origin, Destination, and Journey Date.");
      return;
    }
    setLoading(true);
    setError("");

    navigate("/trains/results", {
      state: {
        origin: originCode,
        destination: destinationCode,
        journey_date: journeyDate,
        class: trainClass,
        quota: quota,
        originInput,
        destinationInput,
      },
    });

    setLoading(false);
  };

  return (
    <>
    <div className="bg-gradient-to-br from-green-400 via-yellow-500 to-orange-600 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/30">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">
            Search Trains
          </h1>
          <p className="text-slate-600 mb-6">
            Enter details to find your train.
          </p>

          {/* Search fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* From */}
            <div className="relative">
              <InputIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </InputIcon>
              <input
                type="text"
                placeholder="From Station"
                value={originInput}
                onChange={(e) => setOriginInput(e.target.value)}
                className="w-full border-slate-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {suggestionLoading &&
                originSuggestions.length === 0 && (
                  <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">
                    ⏳
                  </div>
                )}
              {originSuggestions.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                  {originSuggestions.map((station, i) => (
                    <li
                      key={i}
                      className="p-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectOrigin(station)}
                    >
                      {station.name}, {station.state} ({station.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To */}
            <div className="relative">
              <InputIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400 -rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </InputIcon>
              <input
                type="text"
                placeholder="To Station"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="w-full border-slate-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {suggestionLoading &&
                destinationSuggestions.length === 0 && (
                  <div className="absolute right-4 top-2.5 text-gray-400 animate-spin">
                    ⏳
                  </div>
                )}
              {destinationSuggestions.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-y-auto z-20 shadow-lg rounded-md">
                  {destinationSuggestions.map((station, i) => (
                    <li
                      key={i}
                      className="p-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectDestination(station)}
                    >
                      {station.name}, {station.state} ({station.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Journey Date */}
            <div className="relative">
              <InputIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14"
                  />
                </svg>
              </InputIcon>
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full border-slate-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Class */}
            <div>
              <select
                value={trainClass}
                onChange={(e) => setTrainClass(e.target.value)}
                className="w-full border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="SL">Sleeper (SL)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="1A">AC First Class (1A)</option>
                <option value="CC">AC Chair Car (CC)</option>
                <option value="2S">Second Sitting (2S)</option>
              </select>
            </div>

            {/* Quota */}
            <div>
              <select
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className="w-full border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="GN">General</option>
                <option value="LD">Ladies</option>
                <option value="TQ">Tatkal</option>
                <option value="PT">Premium Tatkal</option>
                <option value="HP">Physically Handicapped</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 font-semibold"
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
                    d="M4 12a8 8 0 018-8V0"
                  ></path>
                </svg>
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0"
                  />
                </svg>
                Search Trains
              </>
            )}
          </button>
        </div>
      </div>

    </div>
    
   <FeatureShowcase/>
   <RouteVisualizer/>
  <InteractiveCardCarousel/>
  <FAQTrain/>
    </>
  );
}
