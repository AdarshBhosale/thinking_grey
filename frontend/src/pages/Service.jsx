import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const services = [
  {
    title: "Micro-video based learning",
    description:
      "Micro-video based learning delivers engaging, bite-sized videos to boost knowledge retention and learner engagement. Ideal for quick, on-the-go training.",
    image: "/images/services/micro-video.png",
  },
  {
    title: "eModules",
    description:
      "eModules enhance learning with interactive features and gamification, making training engaging and effective.",
    image: "/images/services/emodules.png",
  },
  {
    title: "Customized Learning Portals",
    description:
      "Customized Learning Portals provide tailored platforms for seamless, interactive learning. They integrate resources, track progress, and enhance user experience.",
    image: "/images/services/portals.png",
  },
  {
    title: "Gamified Learning",
    description:
      "Gamified Learning incorporates game elements to make training fun and engaging, driving higher participation and better retention.",
    image: "/images/services/gamified.png",
  },
  {
    title: "Augmented and Virtual Reality",
    description:
      "Augmented and Virtual Reality (AR/VR) create immersive learning experiences by simulating real-world scenarios, perfect for safety and task training.",
    image: "/images/services/arvr.png",
  },
  {
    title: "Instructor-led training content",
    description:
      "Instructor-led training content offers expert-led sessions for interactive and personalized learning, ideal for complex and detailed subjects.",
    image: "/images/services/instructor-led.png",
  },
  {
    title: "Translation and Localization",
    description:
      "Translation and Localization adapt your content to different languages and cultures, ensuring relevance and clarity for global audiences.",
    image: "/images/services/translation.png",
  },
  {
    title: "End-to-End Learning Campaigns",
    description:
      "End-to-End Learning Campaigns drive engagement from start to finish with strategies that reinforce learning and track progress.",
    image: "/images/services/campaigns.png",
  },
  {
    title: "Learning Chatbot",
    description:
      "Learning Chatbots use AI to interactively support training and communication, covering areas like employee learning, customer service, and more.",
    image: "/images/services/chatbot.png",
  },
];

const Service = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 pt-0">
      <div className="mb-10 text-xl text-center pt-8 border-t">
        <Title text1={"OUR"} text2={"SERVICES"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <img
                src={service.image}
                alt={service.title}
                className="w-5 h-5 md:w-10 md:h-10 object-contain"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                {service.title}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-3">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
