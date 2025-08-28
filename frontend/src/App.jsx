import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupForm from "./Pages/Register";
import Home from "./Pages/Home";
import './index.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hotels from "./Pages/Hotels";
import Flights from "./Pages/Flights";
import FlightResults from "./Pages/FlightResults";
import Cab from "./Pages/Cab";
import Bus from "./Pages/Bus";
import TrainPage from "./Pages/TrainPage";
import ComingSoonPage from "./Pages/ComingSoonPage";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  return (
    <Router className="overflow-x-hidden">
      <Navbar 
        isSidebarCollapsed={isSidebarCollapsed} 
        setIsSidebarCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Main content area with dynamic margin and overflow control */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} min-h-screen overflow-x-hidden`}>
        <Routes>
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/hotels" element={<Hotels/>} />
          <Route path="" element={<Flights/>} />
          <Route path="/flights/results" element={<FlightResults/>} />
          <Route path="/cabs" element={<Cab/>} />
          <Route path="/buses" element={<Bus/>} />
          <Route path="/trains" element={<TrainPage/>} />
          <Route path="/soon" element={<ComingSoonPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;