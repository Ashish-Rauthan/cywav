import React from 'react';

const FeatureHighlight = () => {
  const features = [
    {
      title: 'Best Price Guarantee',
      description: 'Find the lowest fares with our intelligent price comparison engine, ensuring you always get the best deal.',
      icon: '💰'
    },
    {
      title: '24/7 Customer Support',
      description: 'Our dedicated team is here to assist you anytime, anywhere, providing peace of mind for your travels.',
      icon: '📞'
    },
    {
      title: 'Easy Booking Process',
      description: 'Book your flights in just a few clicks with our intuitive and user-friendly platform, hassle-free.',
      icon: '✨'
    },
    {
      title: 'Secure Payments',
      description: 'Your transactions are always safe and secure with our advanced encryption and trusted payment gateways.',
      icon: '🔒'
    },
  ];

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out forwards;
          }
        `}
      </style>
      <div className="mb-20 bg-white/60 backdrop-blur-lg py-12 px-6 md:px-12 max-w-7xl mx-auto rounded-3xl shadow-xl border border-blue-100">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 animate-fadeIn">
            Why Book With Us?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Experience unparalleled service and peace of mind with every booking.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg border border-blue-100 transform hover:scale-105 hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 animate-scaleIn"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-6xl mb-5 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureHighlight;