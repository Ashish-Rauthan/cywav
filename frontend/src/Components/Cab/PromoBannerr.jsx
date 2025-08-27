import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-indigo-200 to-white mb-10 mt-10 mx-4 md:mx-20 p-6 rounded-xl shadow-md"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://img.icons8.com/color/96/taxi.png"
            alt="promo"
            className="w-16 h-16"
          />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-green-700">
              Ride now & get <span className="text-red-500">20% off</span> your first cab booking!
            </h3>
            <ul className="list-disc list-inside text-sm mt-2 text-gray-600">
              <li>Use promo code <strong>RIDENOW20</strong> at checkout</li>
              <li>Book via our app to earn bonus ride points</li>
            </ul>
          </div>
        </div>
        <button className=" bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500  text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
          Claim Offer
        </button>
      </div>
    </motion.div>
  );
}
