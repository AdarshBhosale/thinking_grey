/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orderes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import Service from "./pages/Service";
import OurClients from "./pages/OurClients";
import Customise from "./pages/Customise.jsx";
import Profile from "./pages//Profile.jsx";

//px-4 sm:px-[5vw] md;px-[7vw] lg:px[9vw]  -> for small screen, mid screen, large screen
//     <Navbar /> display navbar in all pages before write Routes
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md;px-[7vw] lg:px[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/clients" element={<OurClients />} />
        <Route path="/customise/:productName" element={<Customise />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
