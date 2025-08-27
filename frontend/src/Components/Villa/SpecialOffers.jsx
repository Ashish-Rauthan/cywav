import { motion } from "framer-motion";

export default function SpecialOffers() {
  return (
    <section className="py-12 bg-yellow-50">
      <h2 className="text-3xl font-bold text-center mb-6">Special Offers</h2>
      <div className="flex justify-center space-x-6 px-6">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg text-center">
          🎉 <h3 className="font-semibold text-lg">Diwali Getaways</h3>
          <p className="text-gray-600">Up to 20% Off</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg text-center">
          🌧️ <h3 className="font-semibold text-lg">Monsoon Retreats</h3>
          <p className="text-gray-600">Flat ₹1000 Off</p>
        </motion.div>
      </div>
    </section>
  );
}
