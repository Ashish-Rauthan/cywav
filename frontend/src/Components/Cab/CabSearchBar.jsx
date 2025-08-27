import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

export default function CabSearchBar() {
  return (
    <section className="bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 py-12 pt-30 px-4 md:px-20 rounded-b-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Book a Cab<span className="text-yellow-400">.</span>
      </h2>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Pickup Location */}
        <div className="flex items-center w-full md:w-1/4 space-x-2">
          <FaMapMarkerAlt />
          <input
            type="text"
            placeholder="Pickup location"
            className="border rounded-lg my-6 px-4 py-2 w-full"
          />
        </div>

        {/* Drop Location */}
        <div className="flex items-center w-full md:w-1/4 space-x-2">
          <FaMapMarkerAlt />
          <input
            type="text"
            placeholder="Drop location"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Date */}
        <div className="flex items-center w-full md:w-1/4 space-x-2">
          <FaCalendarAlt />
          <input
            type="text"
            placeholder="Select date & time"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Passengers */}
        <div className="flex items-center w-full md:w-1/4 space-x-2">
          <FaUserFriends />
          <input
            type="text"
            placeholder="No. of passengers"
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Search */}
        <button className=" bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500  hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
          Search
        </button>
      </div>
    </section>
  );
}
