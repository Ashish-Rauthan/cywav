import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations

const FAQFlight = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a flight ticket on your website?",
      answer: "Booking a flight ticket is straightforward! Use the search form at the top of the page. Enter your origin and destination airports, departure and return dates (if applicable), and the number of passengers. Click 'Search Flights' to view available flights, select your preferred itinerary and class, then proceed to booking and payment."
    },
    {
      question: "What types of flight classes are available?",
      answer: "We offer bookings for various flight classes, including Economy, Premium Economy, Business Class, and First Class. The availability of these classes depends on the airline, route, and aircraft type you choose."
    },
    {
      question: "Can I change or cancel my flight ticket?",
      answer: "Flight changes and cancellations are subject to the airline's policy and the specific fare rules of your ticket. You can often manage your booking through the 'My Trips' section. Please be aware that change/cancellation fees and specific time limits for modifications may apply, and some tickets may be non-refundable."
    },
    {
      question: "How can I check my flight status?",
      answer: "You can check your flight status on our website by entering your booking reference or flight number, or directly through the airline's official website or mobile app. This will provide real-time updates on departure/arrival times, gate information, and any potential delays or cancellations."
    },
    {
      question: "What is the baggage allowance for flight travel?",
      answer: "Baggage allowance for flights varies significantly by airline, fare type, and travel class. Typically, you'll have a specified allowance for checked luggage and a carry-on item. Excess baggage may incur additional fees. We strongly recommend checking the specific baggage policies of your chosen airline before you fly."
    },
    {
      question: "Are meals provided on the flight?",
      answer: "Meal and catering services vary greatly depending on the airline, flight duration, and travel class. For most long-haul international flights and higher classes, meals are usually included. On shorter domestic flights or in Economy class, meals may be available for purchase, or only snacks/beverages might be provided. Check your flight details or the airline's website for specific meal information."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    whileHover: {
      scale: 1.01, // Subtle zoom on hover
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow
      borderColor: "rgba(37, 99, 235, 0.4)", // Subtle blue border on hover
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      <style>
        {`
          .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out, padding 0.4s ease-out;
          }
          .faq-answer.open {
            max-height: 500px; /* Adjust this value as needed based on max content height */
            padding-top: 1rem; /* pt-4 */
            padding-bottom: 1rem; /* pb-4 */
          }
        `}
      </style>

      <div className="mb-20 mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find quick answers to common questions about booking your flight journey.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4 bg-white/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl border border-blue-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md border border-slate-200 overflow-hidden transition-all duration-300 transform"
              variants={itemVariants}
              whileHover="whileHover"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-blue-800 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div
                className={`faq-answer px-5 text-slate-700 leading-relaxed ${
                  openIndex === index ? 'open' : ''
                }`}
              >
                <p>{faq.answer}</p>
              </div>
              {/* Optional: Add a subtle divider if not the last item */}
              {index < faqs.length - 1 && (
                <div className="mx-5 border-b border-blue-100"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default FAQFlight;