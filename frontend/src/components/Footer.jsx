import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p>
            Ready to Transform Your Learning and Development? Contact Us Today!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/collection" onClick={() => window.scrollTo(0, 0)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Tel: 9324670321</li>
            <li>Email:mugdha@thinkinggrey.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          copyright 2025@ forever - All rights are reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
