import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import PrivacyPolicy from "./Pages/Privacypage";
import ScrollToTop from "./Components/ScrollToTop";
import AboutPage from "./Pages/AboutPage";
import ContactUs from "./Components/Contact";
import TermsAndConditions from "./Pages/Terms";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  
  return (
    <Router className="overflow-x-hidden">
      <ScrollToTop /> {/* Add this component */}
      <Navbar 
        isSidebarCollapsed={isSidebarCollapsed} 
        setIsSidebarCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Main content area with dynamic margin and overflow control */}
      <div className={`transition-all duration-200 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} min-h-screen overflow-x-hidden`}>
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
          <Route path="/privacy" element={<PrivacyPolicy/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/terms" element={<TermsAndConditions/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;