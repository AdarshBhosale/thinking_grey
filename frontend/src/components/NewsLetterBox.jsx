/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault(); // prevent page refresh
  
    try {
      const response = await axios.post("http://localhost:4000/api/subscribe", {
        email,
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our newsletter and unlock exclusive deals, content, and early
        updates.
      </p>
      <form
        onSubmit={handleSubscribe}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
