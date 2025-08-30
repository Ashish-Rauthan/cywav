import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sections for navigation
  const sections = [
    { id: 'booking-agreement', title: 'Flight Booking Agreement' },
    { id: 'ticket-conditions', title: 'Airline Ticket Conditions' },
    { id: 'cancellation-policy', title: 'Flight Cancellation Policy' },
    { id: 'change-fees', title: 'Flight Change Fees' },
    { id: 'passenger-responsibilities', title: 'Passenger Responsibilities' },
    { id: 'baggage-rules', title: 'Baggage Rules and Fees' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Information' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide back to top button
      setShowBackToTop(window.scrollY > 300);
     
      // Find active section
      const scrollPosition = window.scrollY + 100;
     
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
         
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Helmet>
        <title>Flight Booking Terms and Conditions | Cywav Policies</title>
        <meta name="description" content="Read our flight booking terms and conditions. Understand airline reservation policies, cancellation rules, baggage fees, and passenger obligations before booking flights." />
        <meta name="keywords" content="flight booking terms, airline conditions, flight cancellation policy, baggage rules, airline reservation terms, flight booking agreement, air travel policies, passenger rights, flight change fees, airline ticket conditions" />
        
      </Helmet>

      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Flight Booking Terms and Conditions
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Important information about booking flights with AirTravel
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
          
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <motion.p
                  className="mb-8 text-lg text-gray-700"
                  variants={itemVariants}
                >
                  Welcome to Cywav! These terms and conditions govern your use of our flight booking platform and services. By booking flights through our website, you agree to comply with these airline reservation terms and conditions.
                </motion.p>

                {/* Sections */}
                <motion.div variants={itemVariants} id="booking-agreement">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">1. Flight Booking Agreement</h2>
                  <p className="mb-4 text-gray-700">
                    When you book flights through our platform, you enter into a contract with the airline. We act as an intermediary connecting passengers with airlines. Our flight booking services include searching, comparing, and reserving airline tickets based on your travel preferences.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} id="ticket-conditions">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">2. Airline Ticket Conditions</h2>
                  <p className="mb-4 text-gray-700">
                    All flight reservations are subject to the airline's terms and conditions. These include but are not limited to:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-700">
                    <li>Flight schedules and routing changes</li>
                    <li>Baggage allowances and fees</li>
                    <li>Check-in procedures and deadlines</li>
                    <li>Passenger identification requirements</li>
                    <li>Restrictions on certain items</li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} id="cancellation-policy">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">3. Flight Cancellation Policy</h2>
                  <p className="mb-4 text-gray-700">
                    Cancellation policies vary by airline and fare type. Generally:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-700">
                    <li>Refundable tickets allow cancellations with a full or partial refund</li>
                    <li>Non-refundable tickets may not be eligible for refunds</li>
                    <li>Cancellation fees apply based on how close to departure you cancel</li>
                    <li>Airlines may offer travel credits instead of refunds</li>
                  </ul>
                  <p className="mb-4 text-gray-700">
                    Always review the specific airline's cancellation policy before completing your flight reservation.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} id="change-fees">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">4. Flight Change Fees</h2>
                  <p className="mb-4 text-gray-700">
                    Changes to your flight itinerary may incur fees and fare differences. Most airlines charge:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-700">
                    <li>Change fees (typically $75-$400 depending on airline and route)</li>
                    <li>Fare difference if the new flight costs more</li>
                    <li>Additional fees for same-day changes</li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} id="passenger-responsibilities">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">5. Passenger Responsibilities</h2>
                  <p className="mb-4 text-gray-700">
                    As a passenger, you are responsible for:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-700">
                    <li>Providing accurate personal information during flight booking</li>
                    <li>Having valid travel documents (passport, visa, etc.)</li>
                    <li>Arriving at the airport with sufficient time for check-in and security</li>
                    <li>Complying with airline and airport security regulations</li>
                    <li>Paying any applicable taxes, fees, or surcharges</li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} id="baggage-rules">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">6. Baggage Rules and Fees</h2>
                  <p className="mb-4 text-gray-700">
                    Each airline has specific baggage policies including:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-700">
                    <li>Size and weight restrictions for checked and carry-on luggage</li>
                    <li>Excess baggage fees</li>
                    <li>Prohibited items</li>
                    <li>Special baggage handling (sports equipment, musical instruments)</li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} id="liability">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">7. Limitation of Liability</h2>
                  <p className="mb-4 text-gray-700">
                    Our liability is limited to providing flight booking services. We are not responsible for:
                  </p>
                  <ul className="list-disc pl-8 mb-4 space-y-2 text-gray-700">
                    <li>Flight delays, cancellations, or schedule changes by airlines</li>
                    <li>Lost, damaged, or delayed baggage</li>
                    <li>Denied boarding situations</li>
                    <li>Errors in airline information provided to us</li>
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} id="governing-law">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">8. Governing Law</h2>
                  <p className="mb-4 text-gray-700">
                    These terms and conditions are governed by the laws of India. Any disputes arising from your flight booking will be resolved in the courts of [Your Jurisdiction].
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} id="changes">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">9. Changes to Terms</h2>
                  <p className="mb-4 text-gray-700">
                    We reserve the right to update these flight booking terms and conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our flight booking services constitutes acceptance of the revised terms.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} id="contact">
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 pb-2 border-b-2 border-blue-500">10. Contact Information</h2>
                  <p className="mb-4 text-gray-700">
                    If you have questions about these airline reservation terms, please contact our customer service team:
                  </p>
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">Email:</span>
                      </div>
                      <a href="mailto:support@yourwebsite.com" className="text-blue-600 hover:underline">info@cywav.com</a>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-3">
                      
                    
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Hours:</span>
                      </div>
                      <span>Monday-Friday, 8AM-8PM EST</span>
                    </div>
                  </div>
                </motion.div>

               
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}

     
    </div>
  );
};

export default TermsAndConditions;