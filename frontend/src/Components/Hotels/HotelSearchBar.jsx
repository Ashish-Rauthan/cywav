import { useState } from "react";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";


export default function HotelSearchBar() {
  return (
    <section className="bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 py-12 pt-30 px-4 md:px-20 rounded-b-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Hotels<span className="text-yellow-400">.</span></h2>

      <div className="bg-white  p-4 md:p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Where */}
        <input
          type="text"
          placeholder="Where to?"
          className="border rounded-lg my-6 px-4 py-2 w-full md:w-1/4"
        />

        {/* Date */}
        <div className="flex items-center w-full md:w-1/4 space-x-2">
          <FaCalendarAlt />
          <input
            type="text"
            placeholder="Select date"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Guests */}
        <div className="flex items-center w-full md:w-1/4 space-x-2">
          <FaUserFriends />
          <input
            type="text"
            placeholder="1 room, 2 adults, 0 children"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Search */}
        <button className=" bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500  hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
          Search
        </button>
      </div>

      {/* Bottom Options */}
      <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-white">I'm traveling for work</span>
        </label>

        <div className="flex items-center gap-2 flex-wrap text-white">
          <span>Star Rating:</span>
          {["≤2", "3", "4", "5"].map((star, idx) => (
            <span key={idx} className="border border-white rounded-full px-3 py-1 text-sm hover:bg-white hover:text-blue-600 cursor-pointer transition">
              {star} ★
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
