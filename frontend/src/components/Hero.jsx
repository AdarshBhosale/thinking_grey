import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="text-[#414141] max-w-md">
          {/* Tagline */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 sm:w-8 h-[2px] bg-[#414141]" />
            <p className="font-medium text-sm sm:text-base leading-snug">
              Empowering Minds with Innovative Learning Solutions
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="prata-regular text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            Thinking Grey
          </h1>

          {/* Shop Now */}
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm sm:text-base">SHOP NOW</p>
            <div className="w-6 sm:w-8 h-[1px] bg-[#414141]" />
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2">
        <img
          src={assets.hero_img}
          alt="Hero Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
