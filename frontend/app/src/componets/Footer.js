import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <Link to="/" className="text-3xl font-['Pacifico'] text-white mb-6 inline-block">logo</Link>
          <p className="text-gray-400 mb-6">
            Premium fashion for everyone. Discover the latest trends and timeless classics.
          </p>
          <div className="flex space-x-4">
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-all duration-300">
              <i className="ri-facebook-fill text-white"></i>
            </Link>
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-all duration-300">
              <i className="ri-instagram-fill text-white"></i>
            </Link>
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-all duration-300">
              <i className="ri-twitter-x-fill text-white"></i>
            </Link>
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-all duration-300">
              <i className="ri-pinterest-fill text-white"></i>
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Shop</h4>
          <ul className="space-y-2">
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Women</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Men</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Kids</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Accessories</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">New Arrivals</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Information</h4>
          <ul className="space-y-2">
            <li><Link to="#" className="text-gray-400 hover:text-white transition">About Us</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Shipping Policy</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Returns & Exchanges</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">Size Guide</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Newsletter</h4>
          <p className="text-gray-400 mb-4">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-800 border-none text-white px-4 py-2 rounded-l-button w-full focus:outline-none"
            />
            <button className="bg-primary text-white px-4 py-2 !rounded-r-button hover:bg-gray-900 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-visa-fill text-white text-2xl"></i>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-mastercard-fill text-white text-2xl"></i>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-paypal-fill text-white text-2xl"></i>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-apple-fill text-white text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8">
        <p className="text-gray-500 text-center">
          © 2025 logo. All rights reserved. | Thursday, May 8, 2025
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;