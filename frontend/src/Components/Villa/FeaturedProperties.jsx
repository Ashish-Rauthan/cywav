import { motion } from "framer-motion";

const properties = [
  { name: "Luxury Villa in Goa", img: "https://source.unsplash.com/400x300/?luxury,villa,goa", price: "₹8,500/night" },
  { name: "Mountain Homestay in Manali", img: "https://source.unsplash.com/400x300/?mountain,homestay,india", price: "₹4,200/night" },
  { name: "Kerala Backwater Villa", img: "https://source.unsplash.com/400x300/?kerala,villa", price: "₹6,000/night" }
];

export default function FeaturedProperties() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Homestays & Villas</h2>
      <div className="grid md:grid-cols-3 gap-6 px-6">
        {properties.map((prop, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.03 }} 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img src={prop.img} alt={prop.name} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{prop.name}</h3>
              <p className="text-yellow-500 font-bold">{prop.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
