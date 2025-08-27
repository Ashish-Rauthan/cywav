import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 200) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-100 to-white mb-10 mt-10 mx-4 md:mx-20 p-6 rounded-xl shadow-md"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://img.icons8.com/color/96/discount.png"
            alt="promo"
            className="w-16 h-16"
          />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-blue-700">
              Welcome aboard! Enjoy a <span className="text-red-500">15% discount</span> on stays!
            </h3>
            <ul className="list-disc list-inside text-sm mt-2 text-gray-600">
              <li>Snag a promo code and save up to 10%</li>
              <li>Download the app to earn Trip Coins worth 5% of your booking</li>
            </ul>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Claim Discount
        </button>
      </div>
    </motion.div>
  );
}
