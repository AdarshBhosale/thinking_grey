import React from "react";
import { assets } from "../assets/assets"; // replace with actual icons
import Title from "../components/Title";

const reasons = [
  {
    icon: assets.gallery,
    title: "Creative & Engaging",
    desc: "We craft immersive training content that resonates with your audience.",
  },
  {
    icon: assets.experience,
    title: "10+ Years Experience",
    desc: "Serving clients since 2012 with proven training solutions.",
  },
  {
    icon: assets.Customise,
    title: "Customized Content",
    desc: "Tailored for digital, instructor-led & blended formats.",
  },
  {
    icon: assets.technical,
    title: "Technical & Soft Skills",
    desc: "We cover technical know-how, behavioral & life skills.",
  },
  {
    icon: assets.InfluencerTraining,
    title: "Influencer Training",
    desc: "Experts in sales & influencer engagement programs.",
  },
  {
    icon: assets.impactlearning,
    title: "High Impact Learning",
    desc: "Content that builds skills & business growth opportunities.",
  },
  {
    icon: assets.FastTurnaround,
    title: "Fast Turnaround",
    desc: "Quick delivery without compromising on quality.",
  },
  {
    icon: assets.multiplatform,
    title: "Multi-Platform Delivery",
    desc: "Reach via apps, portals & digital platforms.",
  },
  {
    icon: assets.multilanguage,
    title: "Multilingual Support",
    desc: "Training content in multiple languages for wider reach.",
  },
  {
    icon: assets.idea,
    title: "Ideas Come Free",
    desc: "We’re happy to brainstorm with you. Just ask!",
  },
];

const ReasonsToChoose = () => {
  return (
    <div className="text-center py-8 text-3xl">
      <Title text1={"WHY"} text2={"THINKING GREY?"} />

      <div className="flex flex-wrap justify-center gap-6 px-4 py-16 text-xs sm:text-sm md:text-base text-gray-700">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[19%] xl:w-[18%] p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.icon}
              className="w-12 h-12 m-auto mb-4"
              alt={item.title}
            />
            <p className="font-semibold mb-2">{item.title}</p>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToChoose;
