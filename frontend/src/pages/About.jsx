import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="text-gray-500 text-lg sm:text-xl md:text-1xl lg:text-1xl">
            About Thinking Grey
          </p>
          <hr />
          <b className="text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-2xl">
            Training Solutions for Businesses and Education
          </b>
          <p className="mt-[-10px]">
            Delivering Proven Results with Our E-Learning Solutions: Enhancing
            Engagement, Improving Retention Rates, and Achieving Measurable
            Success Across Diverse Industries See Our Impact Through Key
            Statistics and Achievements
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-gray-600">Quality Assurance:</b>
          <p>
            At Thinking Grey, we take pride in crafting high-quality training
            content that is accurate, engaging, and tailored to your audience.
            Our decade-long experience ensures every module meets the highest
            standards of learning effectiveness and brand alignment.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenice:</b>
          <p className="text-gray-600">
            We simplify the content development process by offering flexible
            formats — digital, instructor-led, and blended. Our solutions are
            built to meet your timelines and learner needs, delivered via
            platforms like learning apps and portals for seamless accessibility.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our collaboration doesn’t end with delivery. We offer continuous
            support, rapid turnaround times, and creative problem-solving to
            ensure your programs succeed. Our clients trust us for our
            reliability, responsiveness, and dedication to measurable impact.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
