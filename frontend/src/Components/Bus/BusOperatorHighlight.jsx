// src/Components/Bus/BusOperatorHighlight.jsx

import React from 'react';

const BusOperatorHighlight = () => {
  const operators = [
    { name: 'GoBus', logo: '🚌', description: 'Nationwide coverage with premium comfort.' },
    { name: 'RoadRunner', logo: '🚍', description: 'The fastest and most frequent routes.' },
    { name: 'CityLink', logo: '🚐', description: 'Connecting major cities with express service.' },
    { name: 'TravelWays', logo: '🛣️', description: 'Your affordable choice for long-distance travel.' },
  ];

  return (
    <div className="my-16 bg-teal-50/50 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center">
          Our Trusted Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {operators.map((op) => (
            <div key={op.name} className="text-center p-6 bg-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4">{op.logo}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{op.name}</h3>
              <p className="text-slate-600 text-sm">{op.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusOperatorHighlight;