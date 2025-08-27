import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import home from "../assets/image.png";

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const mainNavRef = useRef(null);
  const [mainNavHeight, setMainNavHeight] = useState(0);

  const navItems = [
    { name: "Flights", icon: "✈️", path: "/" },
    { name: "Hotels", icon: "🏨", path: "/soon" },
    {
      name: "Homestays",
      icon: <img src={home} alt="" width={30} />,
      path: "/soon",
    },
    { name: "Holidays", icon: "🌴", path: "/soon" },
    { name: "Trains", icon: "🚆", path: "/soon" },
    { name: "Buses", icon: "🚌", path: "/soon" },
    { name: "Cabs", icon: "🚕", path: "/soon" },
    { name: "Attractions", icon: "🎡", path: "/soon" },
    { name: "Visa", icon: "🛂", path: "/soon" },
    { name: "Cruise", icon: "🛳️", path: "/soon" },
    { name: "Forex", icon: "💵", path: "/soon" },
    { name: "Insurance", icon: "🛡️", path: "/soon" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
    // Close mobile menu on navigation
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (mainNavRef.current) {
        setMainNavHeight(mainNavRef.current.offsetHeight);
      }
    };

    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    // Set initial height
    if (mainNavRef.current) {
      setMainNavHeight(mainNavRef.current.offsetHeight);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldBeFixed = !isMobile && isScrolled;

  return (
    <>
      <style>
        {`
          @keyframes left-to-right {
            from { width: 0; }
            to { width: 100%; }
          }
          .animate-left-to-right {
            animation: left-to-right 0.3s ease-out forwards;
          }
        `}
      </style>

      <div style={{ height: shouldBeFixed ? mainNavHeight : 0 }} />

      <div
        ref={mainNavRef}
        className={`w-full flex flex-col items-center bg-white shadow-md transition-all duration-300 ease-in-out z-50 ${
          shouldBeFixed ? "fixed top-0 left-0 py-2" : "relative py-3 md:py-4"
        } lg:flex-row lg:justify-between lg:px-6`}
      >
        {/* Company Name / Logo */}
        <div
          className={`text-3xl font-bold text-blue-600 mb-3 lg:mb-0 ${
            shouldBeFixed ? "lg:text-2xl" : ""
          } transition-all duration-300 ease-in-out`}
        >
          <Link to="/" className="hover:text-blue-700">
            cywav
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="grid grid-cols-4 gap-y-3 gap-x-1 w-full px-2 md:grid-cols-6 lg:flex lg:w-auto lg:space-x-4 lg:gap-0 lg:px-0 lg:ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setActiveTab(item.name)}
              className={`relative flex flex-col items-center p-1 text-center text-gray-900 transition-colors duration-200 hover:text-blue-500 ${
                activeTab === item.name ? "text-blue-600" : ""
              }`}
            >
              <div className="text-xl md:text-2xl">{item.icon}</div>
              <span className="mt-1 text-xs leading-tight md:text-sm md:leading-normal">
                {item.name}
              </span>
              {activeTab === item.name && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-sm animate-left-to-right"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;