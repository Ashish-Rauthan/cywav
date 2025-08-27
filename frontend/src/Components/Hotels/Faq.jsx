import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How do I book a hotel on Trip.com?",
    answer:
      "To book a hotel on Trip.com, simply enter your destination, travel dates, and the number of guests on the page. Then, browse through the available hotels and select the one you want to book. Follow the prompts to enter your payment information and complete the booking.",
  },
  {
    question: "How do I get hotel deals on Trip.com?",
    answer:
      "There are several ways to find affordable hotels on Trip.com. You can narrow down your search results by filtering hotels according to your preferred price range, or you can sort the results by price to view the cheapest options first.",
  },
  {
    question: "Where can I find hotel deals on Trip.com?",
    answer:
      "You can find hotel deals on the homepage or search results by applying filters like price range, deals, and star rating.",
  },
  {
    question: "How can I get lower prices for hotels?",
    answer:
      "Use promo codes, book in advance, and compare prices across multiple hotels to find the best deals.",
  },
  {
    question: "How many hotels are listed on Trip.com?",
    answer:
      "Trip.com lists hundreds of thousands of hotels across the world, including budget stays to luxury resorts.",
  },
  {
    question: "Can I cancel or change my hotel bookings on Trip.com?",
    answer:
      "Yes, depending on the hotel's cancellation policy. Always check the cancellation terms before booking.",
  },
  {
    question: "How do I contact Trip.com customer support?",
    answer:
      "You can contact Trip.com customer support via their Help Center, live chat, or hotline available 24/7.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">FAQ</h2>
      <div className="bg-white rounded-lg shadow-md">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-200 ${
                openIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-md font-semibold text-blue-900">{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 transform ${
                  openIndex === index ? "rotate-180 text-blue-700" : "rotate-0 text-gray-500"
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
