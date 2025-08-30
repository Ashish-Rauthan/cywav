import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import home from "../assets/image.png";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  activeTab,
  setActiveTab,
  isMobile,
}) => {
  const sidebarItems = [
    { name: "Flights", icon: "✈️", path: "/" },
    { name: "Hotels & Homes", icon: "🏨", path: "/soon" },
    { name: "Trains", icon: "🚆", path: "/soon" },
    { name: "Cars", icon: "🚗", path: "/soon" },
    { name: "Tours", icon: "🎡", path: "/soon" },
    { name: "Cruises", icon: "🛳️", path: "/soon" },
    { name: "Insurance", icon: "🛡️", path: "/soon" },
  ];
  
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 transform ${
          isMobile ? (isSidebarOpen ? "w-64" : "w-0") : (isSidebarCollapsed ? "w-20" : "w-64")
        } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 overflow-hidden`}
      >
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-2">
              {/* Hide collapse button on mobile */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-full hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {(!isSidebarCollapsed || isSidebarOpen) && (
                <h2 className="text-xl font-bold transition-opacity duration-300">
                  Menu
                </h2>
              )}
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                  activeTab === item.name
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-900"
                } transition-all duration-300`}
              >
                <span className="text-2xl mr-4">{item.icon}</span>
                {(!isSidebarCollapsed || isSidebarOpen) && (
                  <span className="whitespace-nowrap transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

const Navbar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileMenuHidden, setIsMobileMenuHidden] = useState(false);
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
  
  // Mobile top bar items
  const mobileNavItems = navItems.slice(0, 3);
  
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
    setIsSidebarOpen(false);
  }, [location.pathname]);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (mainNavRef.current) {
        setMainNavHeight(mainNavRef.current.offsetHeight);
      }
    };
    
    const handleScroll = () => {
      // For mobile, hide only the 3 menu items when scrolled
      if (isMobile) {
        setIsMobileMenuHidden(window.scrollY > 50);
      }
    };
    
    // Initial height measurement
    if (mainNavRef.current) {
      setMainNavHeight(mainNavRef.current.offsetHeight);
    }
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);
  
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
      
      {/* Mobile Top Bar - Always visible */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="text-xl font-bold text-blue-600">
          <Link to="/" className="hover:text-blue-700">
            cywav
          </Link>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700">
          Sign in
        </button>
      </div>
      
      {/* Mobile Navigation Items (only 3 items) - Hide when scrolled */}
      <div 
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-40 p-2 flex justify-around transition-transform duration-300 ${
          isMobileMenuHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {mobileNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center p-2 rounded-lg ${
              activeTab === item.name
                ? "text-blue-600 font-semibold"
                : "text-gray-900"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
      
      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={isMobile}
      />
      
      {/* Spacer for fixed desktop navbar */}
      <div className="hidden lg:block" style={{ height: `${mainNavHeight}px` }} />
      
      {/* Desktop Top Bar - Always fixed */}
      <div
        ref={mainNavRef}
        className="hidden lg:flex fixed top-0 left-0 right-0 w-full justify-between items-center bg-white shadow-md transition-all duration-300 ease-in-out z-50 py-3 px-6"
      >
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/" className="hover:text-blue-700">
              cywav
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;