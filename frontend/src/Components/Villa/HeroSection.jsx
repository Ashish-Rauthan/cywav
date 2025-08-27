import React from "react";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px]"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl font-bold max-w-3xl">
          Book Your Ideal Homestay – Villas, Apartments & More
        </h1>
        <p className="mt-2 text-lg">
          Find the best deals for your next stay in India
        </p>

        {/* Search Bar under text */}
        <div className="mt-6 w-full max-w-6xl">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
