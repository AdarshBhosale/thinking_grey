import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import Client from "../pages/OurClients";

const home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Client />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default home;
