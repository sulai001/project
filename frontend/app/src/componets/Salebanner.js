import React from "react";
import { Link } from "react-router-dom";

const SaleBanner = () => (
  <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between relative overflow-hidden rounded-3xl bg-white p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Left Side: Text */}
        <div
          className="w-full md:w-1/2 mb-8 md:mb-0 relative z-10 pl-[100px] animate-fade-in-left"
          style={{ animation: "fadeInLeft 1s ease-out" }}
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4 animate-bounce">
            Limited Time Offer
          </span>
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            20% Off
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Discover our exclusive summer collection with special discounts on selected items.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/Shop" className="text-gray-800 font-medium hover:text-purple-600 transition">
              <button className="bg-gray-900 text-white px-8 py-4 font-medium !rounded-button hover:bg-primary hover:scale-105 transition-all duration-300 whitespace-nowrap flex items-center gap-2 animate-pulse">
              Shop Now
              <i className="ri-arrow-right-line transition-all group-hover:translate-x-1"></i>
            </button>
            </Link>
          </div>
        </div>
        {/* Right Side: Image */}
        <div
          className="w-full md:w-1/2 flex justify-center relative animate-fade-in-right"
          style={{ animation: "fadeInRight 1s ease-out" }}
        >
          <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full transform -rotate-45 animate-spin-slow"></div>
            <div className="absolute inset-4 bg-gradient-to-tl from-primary/10 to-transparent rounded-full"></div>
            <img
              src="https://public.readdy.ai/ai/img_res/666f5dc1-0c38-4bb9-963d-e78d5a2de7e6.jpg"
              alt="Sale Banner"
              className="w-full h-full object-cover object-top rounded-3xl scale-100 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Animation Keyframes */}
    <style>
      {`
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-40px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(40px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out;
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(-45deg);}
          100% { transform: rotate(315deg);}
        }
      `}
    </style>
  </section>
);

export default SaleBanner;