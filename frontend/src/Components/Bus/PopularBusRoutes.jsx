// src/Components/Bus/PopularBusRoutes.jsx

import React from 'react';

const PopularBusRoutes = () => {
  const routes = [
    { from: 'New York', to: 'Boston', image: 'https://images.unsplash.com/photo-1570125909232-eb263c186902?auto=format&fit=crop&w=800&q=60', price: '25', duration: '4h 30m' },
    { from: 'San Francisco', to: 'Los Angeles', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=60', price: '35', duration: '6h 15m' },
    { from: 'Chicago', to: 'Minneapolis', image: 'https://images.unsplash.com/photo-1604928141068-a2d04ea27204?auto=format&fit=crop&w=800&q=60', price: '40', duration: '7h' },
    { from: 'Las Vegas', to: 'Phoenix', image: 'https://images.unsplash.com/photo-1619864389977-c3c749afc01a?auto=format&fit=crop&w=800&q=60', price: '30', duration: '5h' },
    { from: 'Miami', to: 'Orlando', image: 'https://images.unsplash.com/photo-1597573284799-71d5b30a1c67?auto=format&fit=crop&w=800&q=60', price: '20', duration: '3h 45m' },
    { from: 'Atlanta', to: 'Nashville', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60', price: '28', duration: '4h' },
  ];

  return (
    <>
      <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
      <div className="my-16 max-w-7xl m-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center animate-fadeInUp">
          Explore Popular Routes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="relative">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{route.from} → {route.to}</h3>
                  <p className="text-sm opacity-90">{route.duration}</p>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center">
                <div>
                  <p className="text-slate-600 text-sm">Starts from</p>
                  <p className="text-2xl font-bold text-blue-600">${route.price}</p>
                </div>
                <button className="bg-gradient-to-br from-indigo-700 via-purple-500 to-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                  Find Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularBusRoutes;