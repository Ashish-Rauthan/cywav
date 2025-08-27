// src/Components/Bus/FAQBus.jsx

import React, { useState } from 'react';

const FAQBus = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Can I choose my seat when booking?",
      answer: "Yes, on most routes you can select your preferred seat during the booking process. Seat selection may sometimes come with a small additional fee depending on the bus operator's policy."
    },
    {
      question: "What is the luggage allowance for bus travel?",
      answer: "Luggage policies vary by operator. Typically, you are allowed one or two checked bags and one carry-on bag. Please check the specific policy for your chosen operator before you travel."
    },
    {
      question: "Are tickets refundable or transferable?",
      answer: "Refund and transfer policies depend on the type of ticket purchased and the operator. Flexible fare tickets usually allow for changes, while standard or promotional fares might be non-refundable. Check the fare rules before booking."
    },
    {
      question: "Do I need to print my ticket?",
      answer: "Most operators now accept e-tickets shown on your mobile device. However, we recommend checking the operator's specific requirements. It's always a good idea to have a digital copy saved on your phone."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
          .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out, padding 0.4s ease-out; }
          .faq-answer.open { max-height: 200px; padding-top: 1rem; padding-bottom: 1rem; }
      `}</style>
      <div className="my-16 bg-white/60 max-w-7xl m-auto backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
          Bus Travel Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-blue-500 hover:bg-gradient-to-br from-indigo-300 via-purple-100 to-blue-200 transition-colors duration-200 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-blue-500 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className={`faq-answer px-5 text-slate-700 ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQBus;