import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cabData = [
  {
    name: "Sedan - Delhi Airport Pickup",
    location: "IGI Airport, Delhi",
    distance: "30 km included",
    price: "$15",
    rating: 9.0,
    reviews: 120,
    image: "https://source.unsplash.com/featured/?sedan,cab",
  },
  {
    name: "SUV - Delhi to Agra",
    location: "Delhi City Center",
    distance: "230 km",
    price: "$45",
    rating: 9.3,
    reviews: 98,
    image: "https://source.unsplash.com/featured/?suv,cab",
  },
  {
    name: "Mini - Local 4 Hours",
    location: "Gurgaon",
    distance: "40 km included",
    price: "$20",
    rating: 8.8,
    reviews: 75,
    image: "https://source.unsplash.com/featured/?mini,taxi",
  },
  {
    name: "Luxury - Delhi to Jaipur",
    location: "Delhi",
    distance: "280 km",
    price: "$80",
    rating: 9.5,
    reviews: 55,
    image: "https://source.unsplash.com/featured/?luxury,car",
  },
];

export default function PopularCabs() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => Math.min(prev + 1, cabData.length - 4));
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Popular Cab Services in India
      </h2>

      <div className="flex gap-3 mb-6">
        {["Delhi", "Mumbai", "Bengaluru"].map((city, i) => (
          <button
            key={i}
            className={`px-4 py-1 rounded-full text-sm font-medium shadow ${
              city === "Delhi"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow"
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 gap-4"
            style={{ transform: `translateX(-${scrollIndex * 25}%)` }}
          >
            {cabData.map((cab, idx) => (
              <div
                key={idx}
                className="w-[calc(25%-1rem)] min-w-[250px] bg-white shadow rounded-xl overflow-hidden"
              >
                <img
                  src={cab.image}
                  alt={cab.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-800 text-white text-sm px-2 py-1 rounded-full">
                      {cab.rating}/10
                    </span>
                    <span className="text-sm text-green-700 underline">
                      {cab.reviews} reviews
                    </span>
                  </div>
                  <h3 className="font-semibold">{cab.name}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {cab.location} | {cab.distance}
                  </p>
                  <p className="mt-2 text-gray-800 font-medium">
                    From <span className="text-lg">{cab.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
