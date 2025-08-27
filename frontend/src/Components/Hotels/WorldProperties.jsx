import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const hotelData = [
  {
    name: "Novotel New Delhi Aerocity-International Airport",
    location: "Asset No 02, Gmr Hospitality District, IGI Rd, Aerocity",
    distance: "13.45KM from city center",
    price: "$69",
    rating: 9.1,
    reviews: 167,
    image: "https://source.unsplash.com/featured/?hotel,1",
  },
  {
    name: "The Metropolitan Hotel & Spa New Delhi",
    location: "Sector 4",
    distance: "1.7KM from city center",
    price: "$80",
    rating: 8.4,
    reviews: 86,
    image: "https://source.unsplash.com/featured/?hotel,2",
  },
  {
    name: "Ibis New Delhi Aerocity - An Accor Brand",
    location: "IGI Rd, Aerocity",
    distance: "13.62KM from city center",
    price: "$47",
    rating: 8.2,
    reviews: 205,
    image: "https://source.unsplash.com/featured/?hotel,3",
  },
  {
    name: "Lemon Tree Premier, Delhi Airport",
    location: "Indira Gandhi International Airport",
    distance: "—",
    price: "$85",
    rating: 9.4,
    reviews: 139,
    image: "https://source.unsplash.com/featured/?hotel,4",
  },
  {
    name: "ITC Maurya, New Delhi",
    location: "Diplomatic Enclave, Chanakyapuri",
    distance: "5KM from city center",
    price: "$120",
    rating: 9.2,
    reviews: 112,
    image: "https://source.unsplash.com/featured/?hotel,5",
  },
  {
    name: "Taj Palace, New Delhi",
    location: "Sardar Patel Marg",
    distance: "4.5KM from city center",
    price: "$135",
    rating: 9.6,
    reviews: 190,
    image: "https://source.unsplash.com/featured/?hotel,6",
  },
  {
    name: "The Park New Delhi",
    location: "Connaught Place",
    distance: "0.9KM from city center",
    price: "$70",
    rating: 8.9,
    reviews: 130,
    image: "https://source.unsplash.com/featured/?hotel,7",
  },
  {
    name: "Radisson Blu Plaza Delhi Airport",
    location: "Near IGI Airport",
    distance: "10KM from city center",
    price: "$90",
    rating: 9.0,
    reviews: 150,
    image: "https://source.unsplash.com/featured/?hotel,8",
  },
];

export default function WorldPopularProperties() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => Math.min(prev + 1, hotelData.length - 4));
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Popular World Properties
      </h2>

      <div className="flex gap-3 mb-6">
        {["New York", "London", "Tokyo"].map((city, i) => (
          <button
            key={i}
            className={`px-4 py-1 rounded-full text-sm font-medium shadow ${
              city === "New York"
                ? "bg-blue-600 text-white"
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
            {hotelData.map((hotel, idx) => (
              <div
                key={idx}
                className="w-[calc(25%-1rem)] min-w-[250px] bg-white shadow rounded-xl overflow-hidden"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-800 text-white text-sm px-2 py-1 rounded-full">
                      {hotel.rating}/10
                    </span>
                    <span className="text-sm text-blue-700 underline">
                      {hotel.reviews} reviews
                    </span>
                  </div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {hotel.location} | {hotel.distance}
                  </p>
                  <p className="mt-2 text-gray-800 font-medium">
                    From <span className="text-lg">{hotel.price}</span>
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

      <div className="text-blue-500 mt-4 text-right cursor-pointer hover:underline">
        Read Reviews
      </div>
    </div>
  );
}
