// src/Layout.jsx

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Make sure this path is correct
import Footer from './Components/Footer'; // Make sure this path is correct

export default function Layout() {
  // The state for the sidebar (collapsed or expanded) lives here.
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // This is the main structure for pages that use the sidebar.
  return (
    <div className="relative min-h-screen bg-slate-50">
      
      {/* 
        The Navbar receives the state and the function to change it.
        This is called "lifting state up".
      */}
      <Navbar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />

      {/* 
        This is the main content wrapper for your pages.
        The left margin (ml) changes dynamically based on the sidebar's state.
        <Outlet /> is where React Router will render your page component (e.g., <Flights />).
      */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <Outlet />
      </main>

      {/* 
        The Footer is also wrapped in a div that gets the same dynamic margin,
        ensuring it always aligns correctly with the content above it.
      */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <Footer />
      </div>

    </div>
  );
}