export default function CabCitySlider() {
  const worldCities = [
    { name: "London", cabs: "4,500", image: "https://source.unsplash.com/featured/?london,city" },
    { name: "New York", cabs: "6,200", image: "https://source.unsplash.com/featured/?newyork,city" },
    { name: "Tokyo", cabs: "5,800", image: "https://source.unsplash.com/featured/?tokyo,city" },
    { name: "Dubai", cabs: "3,400", image: "https://source.unsplash.com/featured/?dubai,city" },
  ];

  const indiaCities = [
    { name: "Delhi", cabs: "3,000", image: "https://source.unsplash.com/featured/?delhi,city" },
    { name: "Mumbai", cabs: "2,800", image: "https://source.unsplash.com/featured/?mumbai,city" },
    { name: "Bengaluru", cabs: "2,200", image: "https://source.unsplash.com/featured/?bengaluru,city" },
    { name: "Kolkata", cabs: "1,900", image: "https://source.unsplash.com/featured/?kolkata,city" },
  ];

  const renderSlider = (title, cities) => (
    <div className="my-10 px-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {cities.map((city, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white mx-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{city.name}</h3>
              <p className="text-gray-500">{city.cabs} cabs available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 py-6">
      {renderSlider("Popular Cab Cities Worldwide", worldCities)}
      {renderSlider("Popular Cab Cities in India", indiaCities)}
    </div>
  );
}
