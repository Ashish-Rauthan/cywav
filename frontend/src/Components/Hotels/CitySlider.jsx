import React from "react";

export default function CitySlider() {
  const worldCities = [
    {
      name: "Shanghai",
      hotels: "7,410",
      image: "https://source.unsplash.com/featured/?shanghai",
    },
    {
      name: "Bangkok",
      hotels: "2,345",
      image: "https://source.unsplash.com/featured/?bangkok",
    },
    {
      name: "Beijing",
      hotels: "6,643",
      image: "https://source.unsplash.com/featured/?beijing",
    },
    {
      name: "Hong Kong",
      hotels: "725",
      image: "https://source.unsplash.com/featured/?hongkong",
    },
  ];

  const indiaCities = [
    {
      name: "Hyderabad",
      hotels: "430",
      image: "https://source.unsplash.com/featured/?hyderabad",
    },
    {
      name: "Gurugram",
      hotels: "465",
      image: "https://source.unsplash.com/featured/?gurgaon",
    },
    {
      name: "Ahmedabad",
      hotels: "334",
      image: "https://source.unsplash.com/featured/?ahmedabad",
    },
    {
      name: "Kolkata",
      hotels: "391",
      image: "https://source.unsplash.com/featured/?kolkata",
    },
  ];

  const renderSlider = (title, cities) => (
    <div className="my-10  px-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide transition-transform duration-500 ease-in-out">
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
              <p className="text-gray-500">{city.hotels} hotels</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 py-6">
      {renderSlider("Popular Cities Worldwide", worldCities)}
      {renderSlider("Popular Cities in India", indiaCities)}
    </div>
  );
}
