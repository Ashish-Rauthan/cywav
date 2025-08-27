import { motion } from "framer-motion";

const destinations = [
  { name: "New Delhi", img: "https://source.unsplash.com/800x600/?new-delhi,india" },
  { name: "Bengaluru", img: "https://source.unsplash.com/800x600/?bengaluru,india" },
  { name: "Mumbai", img: "https://source.unsplash.com/800x600/?mumbai,india", highlight: true },
  { name: "Chennai", img: "https://source.unsplash.com/800x600/?chennai,india" },
  { name: "Varanasi", img: "https://source.unsplash.com/800x600/?varanasi,india" },
];

export default function DestinationGrid() {
  return (
    <section className="py-12 bg-white">
      {/* Heading */}
      <h2 className="text-2xl font-bold px-4">Trending destinations</h2>
      <p className="text-gray-600 px-4 mb-6">
        Most popular choices for travellers from India
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {/* Top row: 2 large cards */}
        {destinations.slice(0, 2).map((dest, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-lg overflow-hidden shadow-md h-56 bg-gray-200"
          >
            <img
              src={dest.img}
              alt={dest.name}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md flex items-center">
              <span className="font-bold mr-2">{dest.name}</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                alt="India Flag"
                className="w-5 h-3"
              />
            </div>
          </motion.div>
        ))}

        {/* Bottom row: 3 smaller cards */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          {destinations.slice(2).map((dest, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-lg overflow-hidden shadow-md h-40 bg-gray-200 ${
                dest.highlight ? "border-4 border-yellow-400" : ""
              }`}
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md flex items-center">
                <span className="font-bold mr-2">{dest.name}</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                  alt="India Flag"
                  className="w-5 h-3"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
