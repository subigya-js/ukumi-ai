import React, { useState, useEffect } from "react";
import Image from "next/image";

const options = [
  "Captions",
  "Generate Transcript",
  "Generate Prompts",
  "QnA with transcript",
  "QnA with transcript",
  "QnA with transcript",
  "Generate Shorts",
  "QnA with transcript",
  "Generate Shorts",
  "Captions",
  "Transcription"
];
export function FeatureSection() {
  // const [activeOption, setActiveOption] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveOption((prev) => (prev + 1) % options.length);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="container mx-auto px-6 py-20 max-sm:mt-10">
      <h2 className="text-4xl font-bold max-md:text-3xl mb-4 text-center">
        Are you a creator?
      </h2>
      <p className="text-xl max-sm:text-lg mb-12 text-center">
        Ukumi helps you unleash creativity, we automate the rest
      </p>

      <div className="flex flex-col gap-6">
        {/* First section */}
        <div className="flex flex-col sm:flex-row  justify-between gap-6">
          {/* First Div */}
          <div className="flex flex-col gap-8 justify-around items-start bg-[#121212] border border-[#2e2e2e] rounded-md p-6 ">
            <h1 className="text-xl text-white mb-4 max-w-40 max-sm:max-w-full">
              Intelligent Video Analysis
            </h1>
            <div className="flex w-full gap-2 max-sm:justify-around max-sm:gap-4">
              <img
                className="h-20 w-auto object-contain max-md:h-16 max-sm:h-16 max-sm:w-full"
                src="/images/featureS1img1.svg"
                alt="Feature 1 Image 1"
              />
              <img
                className="h-20 w-auto object-contain max-md:h-16 max-sm:h-16 max-sm:w-full"
                src="/images/featureS1img2.svg"
                alt="Feature 1 Image 2"
              />
              <img
                className="h-20 w-auto object-contain max-md:h-16 max-sm:h-16 max-sm:w-full"
                src="/images/featureS1img1.svg"
                alt="Feature 1 Image 3"
              />
            </div>
          </div>

          {/* Second Div */}
          <div className="flex flex-col justify-between items-start bg-[#121212] border border-[#2e2e2e] rounded-md p-6 flex-1 ">
            <h1 className="text-xl text-white mb-4 max-w-52 max-sm:max-w-full">
              Cross-platform video optimization
            </h1>
            <div  className="w-full">
              <img
                className="h-full w-full object-contain"
                src="/images/featureS2img1.png"
                alt="Feature 2 Image"
              />
            </div>
          </div>
        </div>

        {/* Second section */}
        <div className="flex items-center     justify-center gap-14">
          <div className="flex flex-col gap-6 max-lg:gap-0 items-start bg-[#121212] border border-[#2e2e2e] rounded-md p-6 flex-1  ">
            <h1 className="text-2xl font-sans text-white mb-4">
              Automated short-form video creation
            </h1>

            <div className="flex gap-2 items-center justify-around w-full ">
              {options.slice(0, 4).map((option, index) => (
                <div
                  key={index}
                  className={`m-2 p-2 cursor-pointer font-sans text-center rounded transition-all max-sm:text-xs duration-300 ${
                    index === 2
                      ? "bg-gradient-to-r from-[#593f7f] bg-opacity-50  to-[#815d43] text-white"
                      : "bg-transparent text-gray-400"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center justify-around w-full  ">
              {options.slice(4, 7).map((option, index) => (
                <div
                  key={index}
                  className={`m-2 p-2 cursor-pointer font-sans text-center rounded transition-all max-sm:text-xs duration-300 ${
                    index === 0
                      ? "bg-gradient-to-r from-[#593f7f] bg-opacity-50  to-[#815d43] text-white"
                      : "bg-transparent text-gray-400"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="flex text-center cursor-pointer gap-2 items-center justify-around w-full ">
              {options.slice(7, 11).map((option, index) => (
                <div
                  key={index}
                  className={`m-2 p-2 font-sans rounded transition-all max-sm:text-xs duration-300 ${
                    index === 2
                      ? "bg-gradient-to-r from-[#593f7f] bg-opacity-50  to-[#815d43] text-white"
                      : "bg-transparent text-gray-400"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
