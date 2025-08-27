import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cabData = [
  {
    name: "London Airport Transfer - Sedan",
    location: "Heathrow Airport",
    distance: "30 km included",
    price: "$50",
    rating: 9.2,
    reviews: 210,
    image: "https://source.unsplash.com/featured/?london,taxi",
  },
  {
    name: "New York City Yellow Cab",
    location: "Manhattan",
    distance: "15 km included",
    price: "$40",
    rating: 8.9,
    reviews: 340,
    image: "https://source.unsplash.com/featured/?newyork,taxi",
  },
  {
    name: "Tokyo Private Car",
    location: "Tokyo Station",
    distance: "50 km included",
    price: "$70",
    rating: 9.5,
    reviews: 145,
    image: "https://source.unsplash.com/featured/?tokyo,taxi",
  },
  {
    name: "Dubai Luxury SUV Transfer",
    location: "Dubai Airport",
    distance: "40 km included",
    price: "$85",
    rating: 9.6,
    reviews: 90,
    image: "https://source.unsplash.com/featured/?dubai,luxurycar",
  },
];

export default function WorldPopularCabs() {
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
        Popular Cab Services Worldwide
      </h2>

      <div className="flex gap-3 mb-6">
        {["London", "New York", "Tokyo"].map((city, i) => (
          <button
            key={i}
            className={`px-4 py-1 rounded-full text-sm font-medium shadow ${
              city === "London"
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
