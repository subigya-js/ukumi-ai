import React from "react";
import { IoMdTime } from "react-icons/io";
import { FiShield } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Body = () => {
  return (
    <div>
      <div className="w-full h-[500px] bg-white p-4 flex gap-8 flex-col justify-center items-center">
        <h1 className="text-[#42376A] font-semibold md:text-5xl sm:text-4xl text-[22px] text-center">
          100% Error-Free AI Transcriptions
        </h1>

        <p className="sm:w-[80%] md:w-[70%] md:text-lg lg:w-[50%] lg:text-xl text-center text-[#B46088] text-sm px-4">
          Get flawless transcriptions with our advanced AI-powered repair
          service. Say goodbye to errors and hello to perfection.
        </p>

        <button className="bg-[#FCC25A] px-6 py-3 rounded-md text-[#42376A] hover:bg-[#fbc665] duration-300">
          Request Early Access
        </button>
      </div>

      <div
        id="problem"
        className="w-full h-[800px] md:h-[500px] bg-[#42376A] flex gap-8 pt-10 md:gap-16 flex-col justify-center items-center pb-5"
      >
        <h1 className="text-white font-semibold md:text-5xl sm:text-4xl text-[22px] text-center">
          The Transcript Problem
        </h1>

        <div className="flex flex-col md:flex-row h-full w-full justify-center items-center md:gap-10 gap-5 text-center">
          <div className="w-[90%] md:w-[40%] h-[50%] md:h-[90%] flex flex-col items-center gap-10 py-5 px-10 text-center">
            <div className="text-6xl text-[#FCC25A]">
              <IoMdTime />
            </div>

            <div className="flex flex-col justify-center items-center gap-5">
              <h1 className="font-bold text-lg xl:text-2xl md:text-[15px] lg:text-xl">
                Hours of Manual Corrections
              </h1>

              <p className="text-xs lg:text-sm xl:text-base text-center xl:w-full lg:w-[90%] md:w-[90%] w-full">
                Even with 97% accuracy, a 60-minute video transcript can contain
                hundreds of errors, requiring hours of tedious manual
                corrections.
              </p>
            </div>
          </div>

          <div className="w-[90%] md:w-[40%] h-[50%] md:h-[90%] flex flex-col items-center gap-10 py-5 px-10 text-center">
            <div className="text-6xl text-[#FCC25A]">
              <FiShield />
            </div>

            <div className="flex flex-col gap-5 justify-center items-center">
              <h1 className="font-bold text-lg xl:text-2xl md:text-[15px] lg:text-xl">
                Costly Inaccuracies
              </h1>

              <p className="text-xs lg:text-sm xl:text-base text-center xl:w-full lg:w-[90%] md:w-[90%] w-full ">
                Uncorrected errors can lead to misunderstandings, legal issues,
                and a poor representation of your content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="solution"
        className="w-full h-[10  00px] md:h-[500px] bg-white text-black flex gap-8 pt-10 md:gap-16 flex-col justify-center items-center pb-5"
      >
        <h1 className="text-[#42376A] font-semibold md:text-5xl sm:text-4xl text-[22px] text-center">
          Our Revolutionary Solution
        </h1>

        <div className="flex flex-col md:flex-row h-full w-full justify-center items-center md:gap-10 gap-5 text-center">
          <div className="w-[90%] md:w-[40%] h-[50%] md:h-[90%] flex flex-col items-center gap-10  py-5 px-10 text-center">
            <div className="text-6xl text-[#B46088]">
              <IoMdCheckmarkCircleOutline />
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-xl text-[#42376A]">
                100% Accuracy
              </h1>

              <p className="text-[#B46088]">
                Our AI ensures every transcription is error-free, guaranteed.
              </p>
            </div>
          </div>

          <div className="w-[90%] md:w-[40%] h-[50%] md:h-[90%] flex flex-col items-center gap-10  py-5 px-10 text-center">
            <div className="text-6xl text-[#B46088]">
              <IoMdTime />
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-xl text-[#42376A]">
                5-Minute Repair
              </h1>

              <p className="text-[#B46088]">
                Repair all errors in your transcripts within just 5 minutes,
                saving you hours of work.
              </p>
            </div>
          </div>

          <div className="w-[90%] md:w-[40%] h-[50%] md:h-[90%] flex flex-col items-center gap-10  py-5 px-10 text-center">
            <div className="text-6xl text-[#B46088]">
              <FiShield />
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-xl text-[#42376A]">
                Secure & Confidential
              </h1>

              <p className="text-[#B46088]">
                Your data is protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="pricing"
        className="w-full h-[500px] bg-[#42376A] text-white p-4 flex flex-col justify-center items-center gap-5"
      >
        <h1 className="font-semibold md:text-5xl sm:text-4xl text-[25px] text-center">
          Simple, Transparent Pricing
        </h1>

        <div className="h-[80%] xl:w-[30%] lg:w-[40%] md:w-[50%] sm:w-[50%] w-[90%] bg-[#e6e5e5] rounded-md border border-orange-300 flex flex-col justify-center items-center gap-5">
          <h1 className="text-[#42376A] font-semibold text-2xl">
            Unlimited Transcriptions
          </h1>

          <h1 className="text-[#42376A] font-bold text-6xl">$299</h1>
          <p className="text-[#B46088] text-sm">per month</p>

          <ul className="flex flex-col gap-1 text-[#42376A] justify-center text-lg">
            <li className="flex items-center gap-2 text-[#B46088]">
              <IoMdCheckmarkCircleOutline />
              <span className="text-md text-[#42376A]">
                100% Error-Free Guarantee
              </span>
            </li>
            <li className="flex items-center gap-2 text-[#B46088]">
              <IoMdCheckmarkCircleOutline />
              <span className="text-md text-[#42376A]">
                Unlimited Transcriptions
              </span>
            </li>
            <li className="flex items-center gap-2 text-[#B46088]">
              <IoMdCheckmarkCircleOutline />
              <span className="text-md text-[#42376A]">
                5-Minute Repair Time
              </span>
            </li>
          </ul>

          <button className="bg-[#FCC25A] px-10 md:px-20 py-3 rounded-md text-[#42376A] hover:bg-[#fbc665] duration-300">
            Request Early Access
          </button>
        </div>
      </div>

      <div className="w-full h-[500px] bg-white text-black p-4 flex flex-col justify-center items-center text-center gap-10">
        <div className="flex flex-col justify-center items-center text-center gap-5">
          <h1 className="text-[#42376A] font-semibold md:text-5xl sm:text-4xl text-[22px] text-center">
            Ready to Transform Your Transcripts?
          </h1>

          <p className="sm:w-[80%] md:w-[70%] md:text-lg lg:w-[70%] lg:text-xl text-center text-[#B46088] text-sm px-4">
            Be among the first to experience error-free transcripts. Request
            early access now.
          </p>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center">
          <form
            action="submit"
            className="flex gap-4 items-center flex-col md:flex-row"
          >
            <input
              required={true}
              placeholder="Enter your email"
              className="w-[300px] p-2 rounded-md border border-[#B46088] placeholder:text-gray-400 font-normal outline-none"
            />
            <button className="bg-[#FCC25A] px-5 md:px-6 py-2 rounded-md text-[#42376A] hover:bg-[#fbc665] duration-300">
              Request Access
            </button>
          </form>

          <p className="text-[#B46088] text-xs">
            By requesting access, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Body;
