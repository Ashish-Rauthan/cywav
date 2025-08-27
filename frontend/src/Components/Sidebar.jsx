// components/Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHotel,
  FaPlane,
  FaTrain,
  FaCar,
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaGift,
  FaShip,
  FaShieldAlt,
  FaRegCompass,
  FaRegMap,
  FaTags
} from "react-icons/fa";

const navItems = [
  { icon: FaHotel, label: "Hotels & Homes", path: "/hotels" },
  { icon: FaPlane, label: "Flights", path: "/flights" },
  { icon: FaTrain, label: "Trains", path: "/trains" },
  { icon: FaCar, label: "Cars", path: "/cars" },
  { icon: FaUmbrellaBeach, label: "Attractions & Tours", path: "/attractions" },
  { icon: FaGift, label: "Flight + Hotel", path: "/flight-hotel" },
  { icon: FaShip, label: "Cruises", path: "/cruises" },
  { icon: FaRegCompass, label: "Custom Trips", path: "/custom-trips" },
  { icon: FaShieldAlt, label: "Insurance", path: "/insurance" },
  { icon: FaMapMarkedAlt, label: "Travel Inspiration", path: "/travel-inspiration" },
  { icon: FaRegMap, label: "Map", path: "/map" },
  { icon: FaTags, label: "Deals", path: "/deals" }
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`h-screen bg-white shadow-md border-r border-gray-200 transition-all duration-300 ${open ? "w-60" : "w-16"}`}>
      <button onClick={() => setOpen(!open)} className="p-2">
        <span className="text-gray-700">☰</span>
      </button>
      <ul className="mt-4 space-y-2">
        {navItems.map((item, i) => (
          <li key={i}>
            <Link
              to={item.path}
              className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer"
            >
              <item.icon className="text-blue-500" size={20} />
              {open && <span className="text-sm text-gray-800">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}