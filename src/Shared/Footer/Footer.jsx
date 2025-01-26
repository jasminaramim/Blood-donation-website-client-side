import React from "react";
import { Link } from "react-router-dom";
import { FaTint, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Changed FaBlood to FaTint

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-8">
      <div className="container mx-auto px-6 flex flex-wrap justify-between items-center">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <FaTint className="text-4xl text-white" /> {/* Using FaTint */}
          <h1 className="text-2xl font-bold">Blood Donation</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-red-200">Home</Link>
          <Link to="/about" className="hover:text-red-200">About</Link>
          <Link to="/donation-requests" className="hover:text-red-200">Requests</Link>
          <Link to="/donors" className="hover:text-red-200">Donors</Link>
          <Link to="/contact" className="hover:text-red-200">Contact</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-red-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-red-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-red-200" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-red-200" />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-white pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Blood Donation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
