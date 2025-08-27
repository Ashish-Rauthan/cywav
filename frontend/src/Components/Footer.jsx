import {
  FaFacebookF,
  FaXTwitter,
  FaWeixin,
  FaYoutube
} from 'react-icons/fa6';

// (Assuming your image imports are in the correct relative path)
import googleLogo from '../assets/google.jpg';
import tripadvisorLogo from '../assets/tripadvisor.jpg';
import applePay from '../assets/apple-pay.jpg';
import paypal from '../assets/paypal.jpg';
import rupay from '../assets/rupay.jpg';
import mastercard from '../assets/mastercard.jpg';
import visa from '../assets/visa.jpg';
import amex from '../assets/amex.jpg';
import jcb from '../assets/jcb.jpg';
import unionpay from '../assets/unionpay.jpg';
import discover from '../assets/discover.jpg';
import tLogo from '../assets/t.jpg';

// Data for footer sections to make the component cleaner
const footerSections = [
  {
    title: 'Contact Us',
    ariaLabel: 'Contact Us',
    links: ['Customer Support', 'Service Guarantee', 'More Service Info'],
    social: true,
  },
  {
    title: 'About',
    ariaLabel: 'About Section',
    links: ['About Cywav.com', 'News', 'Careers', 'Terms & Conditions', 'Privacy Statement', 'Accessibility Statement', 'Do Not Sell My Personal Info'],
  },
  {
    title: 'Other Services',
    ariaLabel: 'Other Services',
    links: ['Investor Relations', 'Cywav.com Rewards', 'Affiliate Program', 'List Your Property', 'All Hotels', 'Become a Supplier', 'Security'],
  },
];

const paymentLogos = [applePay, paypal, rupay, mastercard, visa, amex, jcb, unionpay, discover, tLogo];

export default function Footer() {
  return (
    <>
      {/* 
        STEP 1: SELF-CONTAINED ANIMATION STYLES
        This <style> tag defines our custom animations. By placing it here,
        we don't need to modify the external tailwind.config.js file.
        The classes .animate-fade-in-up and .animate-pulse-subtle can now be used below.
      */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulseSubtle {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          /* We set initial opacity to 0 for elements that will fade in */
          .fade-in-start {
             opacity: 0;
          }

          .animate-fade-in-up {
            /* The 'forwards' fill-mode is crucial to keep the final state after animation */
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-pulse-subtle {
            animation: pulseSubtle 2.5s infinite ease-in-out;
          }
        `}
      </style>

      {/* 
        STEP 2: THE FOOTER COMPONENT
        The JSX below uses Tailwind CSS for responsiveness and the custom animation 
        classes defined in the <style> tag above.
      */}
      <footer className="bg-gray-50 px-6 md:px-12 lg:px-16 pt-16 pb-8 text-sm text-gray-700 overflow-hidden">
        
        {/* --- Main Content Grid --- */}
        {/* Enhanced responsiveness: 1 col -> 3 cols -> 5 cols */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {footerSections.map((section, index) => (
            <div 
              key={section.title} 
              aria-label={section.ariaLabel}
              // Staggered fade-in animation
              className="fade-in-start animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h4 className="font-semibold mb-4 text-gray-800">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link}>
                    {/* Hover animation on links */}
                    <a href="#" className="hover:text-blue-600 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              {section.social && (
                <div className="flex gap-4 mt-5 text-xl text-gray-500">
                  {/* Hover animation on social icons */}
                  <a href="#" aria-label="Facebook" className="hover:text-blue-700 hover:scale-110 transition-all duration-300"><FaFacebookF /></a>
                  <a href="#" aria-label="X Twitter" className="hover:text-black hover:scale-110 transition-all duration-300"><FaXTwitter /></a>
                  <a href="#" aria-label="WeChat" className="hover:text-green-500 hover:scale-110 transition-all duration-300"><FaWeixin /></a>
                  <a href="#" aria-label="YouTube" className="hover:text-red-600 hover:scale-110 transition-all duration-300"><FaYoutube /></a>
                </div>
              )}
            </div>
          ))}

          {/* --- Payments & Partners Section (as 2 separate divs for clarity) --- */}
          <div 
            className="lg:col-span-2 grid grid-cols-1 gap-10 fade-in-start animate-fade-in-up"
            style={{ animationDelay: `${footerSections.length * 150}ms` }}
          >
            <div aria-label="Payment Methods">
              <h4 className="font-semibold mb-4 text-gray-800">Payment Methods</h4>
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {paymentLogos.map((logo, i) => (
                  <img
                    key={i}
                    src={logo}
                    loading="lazy"
                    alt={`Payment method ${i + 1}`}
                    // Hover animation on payment logos
                    className="w-11 h-7 object-contain rounded-sm bg-white shadow-sm cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300"
                  />
                ))}
              </div>
            </div>
            <div aria-label="Our Partners">
              <h4 className="font-semibold mb-4 text-gray-800">Our Partners</h4>
              <div className="flex gap-4 items-center">
                {/* Hover animation on partner logos */}
                <img src={googleLogo} alt="Google Partner" className="h-7 cursor-pointer hover:opacity-80 transition-opacity duration-300" loading="lazy" />
                <img src={tripadvisorLogo} alt="Tripadvisor Partner" className="h-7 cursor-pointer hover:opacity-80 transition-opacity duration-300" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="max-w-7xl mx-auto border-t border-gray-200 mt-12 pt-6 text-center text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4 font-medium text-gray-600">
            {/* Subtle pulse animation on awards */}
            <span className="inline-block animate-pulse-subtle">🏆 GOOD DESIGN AWARD 2024</span>
            <span className="inline-block animate-pulse-subtle" style={{ animationDelay: '300ms' }}>🏅 Contact Center of the Year 2024</span>
          </div>
          <p className="leading-relaxed">
            &copy; 2025 Cywav.com Travel Singapore Pte. Ltd. All rights reserved.<br />
            Site Operator: Cywav.com Travel Singapore Pte. Ltd.
          </p>
        </div>
      </footer>
    </>
  );
}