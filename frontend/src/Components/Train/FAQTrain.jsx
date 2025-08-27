import React, { useState } from 'react';

const FAQTrain = () => {
  // State to manage which FAQ item is currently open.
  // We'll store the index of the open item. -1 means none are open.
  const [openIndex, setOpenIndex] = useState(null);

  // Array of FAQ data, now focused on train travel.
  const faqs = [
    {
      question: "How do I book a train ticket on your website?",
      answer: "Booking a train ticket is simple! Use the search form at the top of the page. Enter your origin and destination stations, departure date, and the number of passengers. Click 'Search Trains' to view available trains, select your preferred class and seat, then proceed to booking and payment."
    },
    {
      question: "What types of train classes are available?",
      answer: "We offer bookings for various train classes, including AC First Class (1A), AC Two Tier (2A), AC Three Tier (3A), Sleeper Class (SL), and various Chair Car options (CC, 2S). The availability of classes depends on the specific train and route you choose."
    },
    {
      question: "Can I change or cancel my train ticket?",
      answer: "Ticket changes and cancellations are subject to the railway's policy and the specific fare rules of your ticket. You can manage your booking through the 'My Trips' section. Please be aware that cancellation fees and specific time limits for modifications may apply."
    },
    {
      question: "How can I check my PNR status?",
      answer: "You can check your PNR (Passenger Name Record) status on our website or through the railway's official portal by entering your unique PNR number. This will provide real-time updates on your ticket's confirmation status and seat details."
    },
    {
      question: "What is the baggage allowance for train travel?",
      answer: "The standard baggage allowance for train travel in India is typically more generous than flights. Passengers are generally allowed to carry a certain amount of luggage for free, with an additional allowance for registered luggage. We recommend checking the official railway guidelines for specific limits based on your travel class."
    },
    {
      question: "Are meals provided on the train?",
      answer: "Meals and catering services vary by train type and route. For many long-distance express trains, catering is an available option, and for some, it's included in the fare. You can check for meal options when selecting your train and class during the booking process."
    }
  ];

  // Function to toggle the open/close state of an FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Inline style for keyframes to keep all changes in one file */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out forwards;
          }

          @keyframes rotateArrow {
            from { transform: rotate(0deg); }
            to { transform: rotate(180deg); }
          }
          .animate-rotateArrow {
            animation: rotateArrow 0.3s forwards;
          }
          .animate-unrotateArrow {
            animation: rotateArrow 0.3s reverse forwards;
          }

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

      <div className="mb-12 bg-white/60 max-w-7xl m-auto backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30 animate-fadeInUp">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center animate-fadeInUp">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-blue-700 hover:bg-blue-50 transition-colors duration-200 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-blue-500 transform transition-transform duration-300 ${
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
                className={`faq-answer px-5 text-slate-700 ${
                  openIndex === index ? 'open' : ''
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQTrain;