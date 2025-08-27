
import { useState } from "react";



export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Hotels & Homes");

  return (
    <div className="flex h-screen">
    
      <div className="flex-1 p-6 bg-blue-50 overflow-y-auto">

       

        {/* Horizontal Scroll Section – Featured Destinations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Destinations</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {[
              { name: "Paris", image: "https://source.unsplash.com/300x200/?paris" },
              { name: "Tokyo", image: "https://source.unsplash.com/300x200/?tokyo" },
              { name: "New York", image: "https://source.unsplash.com/300x200/?newyork" },
              { name: "Dubai", image: "https://source.unsplash.com/300x200/?dubai" },
              { name: "London", image: "https://source.unsplash.com/300x200/?london" },
            ].map((item, idx) => (
              <div key={idx} className="min-w-[300px] bg-white rounded shadow overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-2 font-semibold text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Promo Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold mb-2">Summer Sale</h2>
            <p>Save up to 40% on travel</p>
            <button className="mt-2 bg-white border border-blue-600 text-blue-600 px-4 py-1 rounded">Explore now</button>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold mb-2">Attractions & Tours</h2>
            <p>Up to 25% OFF</p>
            <button className="mt-2 bg-white border border-yellow-600 text-yellow-600 px-4 py-1 rounded">Book Now</button>
          </div>

          <div className="bg-purple-100 p-4 rounded shadow text-center">
            <h2 className="text-lg font-bold mb-2">Universal Studios</h2>
            <p>50% OFF 1-Day Tickets</p>
            <button className="mt-2 bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded">Book Now</button>
          </div>
        </div>

        {/* NEW SECTION: Top Hotel Deals */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Top Hotel Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Marina Bay Sands", image: "https://source.unsplash.com/400x250/?luxury-hotel" },
              { name: "Burj Al Arab", image: "https://source.unsplash.com/400x250/?hotel-dubai" },
              { name: "The Plaza NYC", image: "https://source.unsplash.com/400x250/?hotel-newyork" },
            ].map((hotel, idx) => (
              <div key={idx} className="bg-white rounded shadow overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-600">From $199/night</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEW SECTION: Why Book With Us */}
        <div className="mt-16 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Book With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "✈️", title: "Worldwide Coverage" },
              { icon: "💰", title: "Best Price Guarantee" },
              { icon: "🕒", title: "24/7 Support" },
              { icon: "🔒", title: "Secure Payments" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="text-4xl">{item.icon}</div>
                <div className="font-semibold">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
