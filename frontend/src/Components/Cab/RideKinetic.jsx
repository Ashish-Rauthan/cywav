// AnimatedCabShowcase.jsx
import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaCar, FaShuttleVan, FaBus, FaTaxi } from "react-icons/fa";
import { FiChevronDown, FiInfo } from "react-icons/fi";

/**
 * Highly animated Cab Service Details Showcase
 * - purely informational (no booking)
 * - requires: framer-motion, react-icons, tailwindcss
 */

const CAB_TYPES = [
  {
    id: "sedan",
    name: "Sedan",
    icon: FaCar,
    color: "#06b6d4",
    tagline: "City comfort for up to 4 passengers",
    features: ["AC & Music", "Compact & Efficient", "Door-to-door"],
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/taxi-1959329_1280.jpg",
  },
  {
    id: "suv",
    name: "SUV",
    icon: FaShuttleVan,
    color: "#7c3aed",
    tagline: "Space & luggage for families and groups",
    features: ["Large Trunk", "Extra Legroom", "Child Seat Available"],
    img: "https://cdn.pixabay.com/photo/2017/03/21/16/00/suv-2168728_1280.jpg",
  },
  {
    id: "luxury",
    name: "Executive",
    icon: FaTaxi,
    color: "#ef4444",
    tagline: "Premium rides for business & events",
    features: ["Leather Interior", "Complimentary Wi-Fi", "Chauffeur Service"],
    img: "https://cdn.pixabay.com/photo/2017/03/27/15/58/mercedes-2182280_1280.jpg",
  },
  {
    id: "minibus",
    name: "Mini Bus",
    icon: FaBus,
    color: "#f59e0b",
    tagline: "Group travel & airport shuttles",
    features: ["AC Coach", "Guide Friendly", "Bulk Luggage"],
    img: "https://cdn.pixabay.com/photo/2016/12/02/14/46/bus-1871354_1280.jpg",
  },
];

/* Motion variants */
const container = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const card = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};
const floaty = {
  animate: { y: [0, -8, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
};

export default function AnimatedCabShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  if (isInView) controls.start("show");

  return (
    <section className="relative w-full min-h-[100vh] bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden py-20">
      {/* Decorative animated orbs (parallax-like) */}
      <motion.div
        aria-hidden
        className="absolute -left-40 top-10 w-80 h-80 rounded-full mix-blend-screen opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle,#06b6d4,transparent 40%)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 bottom-20 w-96 h-96 rounded-full mix-blend-screen opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent 35%)" }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <header className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Cab Service Details
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-300 max-w-2xl mx-auto"
          >
            An animated, information-first showcase of our fleet types & features — clear, elegant, and interactive.
          </motion.p>
        </header>

        {/* marquee / highlight strip */}
        <div className="relative overflow-hidden rounded-xl mb-10">
          <motion.div
            className="whitespace-nowrap py-2 text-slate-900 text-sm font-medium"
           
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          >
            <div className="inline-flex gap-8 px-6 bg-white p-2">
              <span className="inline-flex items-center gap-2">🛡️ Sanitized Fleet</span>
              <span className="inline-flex items-center gap-2">⏱️ Real-time ETA Insights</span>
              <span className="inline-flex items-center gap-2">📶 In-ride Wi-Fi (Select)</span>
              <span className="inline-flex items-center gap-2">👔 Executive Class Available</span>
              <span className="inline-flex items-center gap-2">🚱 Child Seats on Request</span>
              <span className="inline-flex items-center gap-2">🧾 Detailed Ride Receipts</span>
              <span className="inline-flex items-center gap-2">🛡️ Sanitized Fleet</span>
              <span className="inline-flex items-center gap-2">⏱️ Real-time ETA Insights</span>
              <span className="inline-flex items-center gap-2">📶 In-ride Wi-Fi (Select)</span>
              <span className="inline-flex items-center gap-2">👔 Executive Class Available</span>
              <span className="inline-flex items-center gap-2">🚱 Child Seats on Request</span>
              <span className="inline-flex items-center gap-2">🧾 Detailed Ride Receipts</span>
            </div>
           
          </motion.div>
        </div>

        {/* Grid of animated cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {CAB_TYPES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.id}
                variants={card}
                className="relative bg-gradient-to-br from-white/5 to-white/3 border border-white/6 rounded-2xl p-4 lg:p-6 shadow-xl backdrop-blur-sm transform-gpu will-change-transform"
                whileHover={{ scale: 1.04 }}
                tabIndex={0}
                aria-labelledby={`${c.id}-title`}
              >
                {/* floating badge + icon */}
                <motion.div
                  className="absolute -top-6 left-6 bg-white/6 backdrop-blur rounded-full p-2 border border-white/8"
                  variants={floaty}
                  animate="animate"
                >
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full"
                    style={{ background: `linear-gradient(135deg, ${c.color}22, transparent)` }}
                    aria-hidden
                  >
                    <Icon className="w-6 h-6" style={{ color: c.color }} />
                  </motion.div>
                </motion.div>

                {/* image with parallax tilt illusion */}
                <div className="rounded-xl overflow-hidden h-40 mb-4 shadow-lg" style={{ perspective: 1000 }}>
                  <motion.img
                    src={c.img}
                    alt={`${c.name} vehicle`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06, rotate: 0.5 }}
                    transition={{ type: "spring", stiffness: 90, damping: 12 }}
                  />
                </div>

                <h3 id={`${c.id}-title`} className="text-xl font-semibold flex items-center gap-3">
                  <span className="sr-only">{c.name}:</span>
                  {c.name}
                  <span className="text-sm text-slate-300 font-medium ml-auto">{c.tagline}</span>
                </h3>

                {/* features list */}
                <ul className="mt-3 grid gap-2 text-sm text-slate-300">
                  {c.features.map((f, idx) => (
                    <li key={idx} className="inline-flex items-center gap-2">
                      <svg className="w-4 h-4 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke={c.color} strokeWidth="1.5" opacity="0.18" />
                        <path d="M8 12.5l2.2 2.2L16 9" stroke={c.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* hidden expandable micro-info */}
                <details className="mt-4 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm text-slate-200 p-2 rounded-md hover:bg-white/6">
                    <div className="flex items-center gap-2">
                      <FiInfo />
                      <span className="font-medium">More details</span>
                    </div>
                    <FiChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.28 }}
                    className="mt-3 text-slate-300 text-sm leading-relaxed"
                  >
                    <p>
                      Our <strong>{c.name}</strong> vehicles are periodically inspected, sanitized, and insured. Drivers complete safety & hospitality training modules, and most vehicles support contactless payments & digital receipts.
                    </p>
                    <ul className="mt-2 text-slate-300 list-disc list-inside">
                      <li>Average Fuel Efficiency: depends on model (eco to premium)</li>
                      <li>Insurance Coverage: Standard third-party + optional add-ons</li>
                      <li>Accessibility: Select vehicles with low-floor entry on request</li>
                    </ul>
                  </motion.div>
                </details>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Footer micro-pattern / credits */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center text-sm text-slate-400"
        >
          Designed for detail-first UX — animated, accessible, and fully informational.
        </motion.p>
      </div>
    </section>
  );
}
