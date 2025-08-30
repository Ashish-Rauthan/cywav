import React from 'react';
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          </div>
          <div className="prose prose-blue max-w-none">
            {/* Introduction Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700">
                At Cywav Travel, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
              </p>
            </section>
            {/* Information We Collect Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Personal Data</h3>
              <p className="text-gray-700 mb-4">
                We collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Physical address</li>
                <li>Passport information (for international travel)</li>
              </ul>
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Booking Data</h3>
              <p className="text-gray-700 mb-4">
                We collect information related to your travel bookings, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Travel itineraries</li>
                <li>Flight details</li>
                <li>Hotel reservations</li>
                <li>Booking history</li>
                <li>Travel preferences</li>
              </ul>
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Payment Data</h3>
              <p className="text-gray-700 mb-4">
                We collect payment information to process your bookings. All payment transactions are processed securely by third-party payment gateways. We do not store your credit card numbers or other payment details on our servers.
              </p>
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Technical Data</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect certain technical information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Browsing activity on our site</li>
                <li>Pages visited</li>
                <li>Time and date of your visit</li>
              </ul>
            </section>
            {/* How We Use Your Information Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>To process and manage your travel bookings</li>
                <li>To communicate with you about your bookings and provide customer support</li>
                <li>To send marketing and promotional materials (you may opt out at any time)</li>
                <li>To improve our website and personalize your user experience</li>
                <li>To analyze usage patterns and trends</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>
            {/* Data Sharing and Disclosure Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Travel Partners</h3>
              <p className="text-gray-700 mb-4">
                We share your booking information with our travel partners, such as airlines, hotels, and tour operators, to fulfill your travel reservations.
              </p>
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third-party service providers who perform services on our behalf, such as payment processors and IT service providers.
              </p>
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required by law or in response to valid requests by public authorities, or to protect our rights, property, or safety.
              </p>
            </section>
            {/* Data Security Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Encryption of sensitive data</li>
                <li>Secure servers</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication procedures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>
            {/* Your Rights and Choices Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to correct or update your personal information</li>
                <li>The right to delete your personal information</li>
                <li>The right to object to or restrict the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, please contact us using the contact information provided below.
              </p>
            </section>
            {/* Cookie Policy Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us understand how you use our site, remember your preferences, and provide personalized content.
              </p>
              <p className="text-gray-700 mb-4">
                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until they expire or you delete them). You can manage your cookie preferences through your browser settings.
              </p>
            </section>
            {/* Changes to This Policy Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically for any changes.
              </p>
            </section>
            
            {/* Accessibility Statement Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Statement</h2>
              <p className="text-gray-700 mb-4">
                Cywav Travel is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to provide an inclusive online experience.
              </p>
              <p className="text-gray-700 mb-4">
                Our goal is to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which outlines recommendations for making web content more accessible to people with a wide array of disabilities.
              </p>
              <p className="text-gray-700 mb-4">
                We have implemented the following accessibility features:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Alternative text for images</li>
                <li>Clear and consistent navigation</li>
                <li>Keyboard accessible functionality</li>
                <li>Color contrast that meets accessibility standards</li>
                <li>Responsive design that works with assistive technologies</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Despite our efforts to make all pages and content on Cywav Travel fully accessible, some content may not have yet been fully adapted to the strictest accessibility standards. This may be a result of not having found or identified the most appropriate technological solution.
              </p>
              <p className="text-gray-700">
                If you are experiencing difficulty with any content on Cywav Travel or require assistance with any part of our site, please contact us at info@cywav.com and we will be happy to assist you.
              </p>
            </section>
            
            {/* Contact Us Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> info@cywav.com
                </p>

              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;