import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaRupeeSign } from "react-icons/fa";

const SearchBar = () => {
  const [location, setLocation] = useState("Goa, India");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    console.log({
      location,
      checkIn,
      checkOut,
      guests,
      priceRange,
    });
    alert("Search triggered! Check console for values.");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-wrap items-center justify-between max-w-6xl mx-auto -mt-12 relative z-10">
      
      {/* Location */}
      <div className="flex items-center gap-2 px-4 py-2 border-r w-full sm:w-auto">
        <FaMapMarkerAlt className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">City, Property Name Or Location</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-lg font-semibold text-gray-700 border-none outline-none w-40"
          />
        </div>
      </div>

      {/* Check-In */}
      <div className="flex items-center gap-2 px-4 py-2 border-r w-full sm:w-auto">
        <FaCalendarAlt className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Check-In</p>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            placeholderText="Select Date"
            className="text-lg font-semibold text-gray-700 border-none outline-none"
          />
        </div>
      </div>

      {/* Check-Out */}
      <div className="flex items-center gap-2 px-4 py-2 border-r w-full sm:w-auto">
        <FaCalendarAlt className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Check-Out</p>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            placeholderText="Select Date"
            className="text-lg font-semibold text-gray-700 border-none outline-none"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center gap-2 px-4 py-2 border-r w-full sm:w-auto">
        <FaUsers className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Guests</p>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="text-lg font-semibold text-gray-700 border-none outline-none"
          >
            <option value="">Add Adults & Children</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4+">4+ Guests</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 px-4 py-2 border-r w-full sm:w-auto">
        <FaRupeeSign className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Price Per Night</p>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="text-lg font-semibold text-gray-700 border-none outline-none"
          >
            <option value="">Select Price Range</option>
            <option value="0-1500">₹0 - ₹1500</option>
            <option value="1500-2500">₹1500 - ₹2500</option>
            <option value="2500-4000">₹2500 - ₹4000</option>
            <option value="4000+">₹4000+</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="px-4 py-2">
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
