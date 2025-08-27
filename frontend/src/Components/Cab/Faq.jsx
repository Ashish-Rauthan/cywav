import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How do I book a cab?",
    answer: "Enter your pickup and drop locations, choose date/time, select the cab type, and confirm your booking with payment."
  },
  {
    question: "Can I book an outstation cab?",
    answer: "Yes, you can book one-way or round-trip outstation rides by selecting the appropriate option in the search form."
  },
  {
    question: "Are airport transfers available?",
    answer: "Yes, we offer 24/7 airport pickup and drop services in multiple cities worldwide."
  },
  {
    question: "Can I modify my cab booking?",
    answer: "Yes, you can modify your booking before the scheduled time, subject to availability."
  },
  {
    question: "How do I get discounts on cab bookings?",
    answer: "Apply promo codes at checkout and check our offers page for ongoing deals."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Free cancellations are available up to 2 hours before pickup. Late cancellations may incur charges."
  },
];

export default function CabFaq() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold mb-6 text-green-900">FAQ</h2>
      <div className="bg-white rounded-lg shadow-md">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-200 ${
                openIndex === index ? "bg-green-50" : "hover:bg-gray-50"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-md font-semibold text-green-900">{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 transform ${
                  openIndex === index ? "rotate-180 text-green-700" : "rotate-0 text-gray-500"
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 px-6 ${
                openIndex === index ? "max-h-96 py-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
