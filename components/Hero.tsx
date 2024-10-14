import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import bg1 from "../public/images/banner-img1.svg";
import bg2 from "../public/images/banner-img2.svg";

export function Hero() {
  return (
    <div className="container mx-auto relative px-4">
      {/* Background elements are commented out */}
      {/* <img src="/images/banner-img1.svg" alt="bg1" className="absolute top-0 left-0 z-10" /> */}
      <div className="py-20 max-w-lg ml-28 z-10 max-md:ml-0 max-md:items-center max-md:justify-center max-sm:w-full flex flex-col gap-8 max-sm:items-center max-sm:text-center">
        <h1 className="text-6xl font-sans max-md:text-4xl font-bold bg-clip-text text-white max-sm:text-center">
          Copilot for Creators
        </h1>
        <p className="text-lg font-sans max-md:text-center max-sm:text-center">
          Our AI powered platform empowers creators to maximize and unlock
          potential of content
        </p>
        <Link href="https://form.typeform.com/to/dnKFaR7g">
          <div className="border-2 cursor-pointer border-white text-white flex py-3 px-4 w-48 justify-center items-center gap-4 rounded text-center max-sm:mx-auto transition-all duration-300 hover:bg-white hover:text-black hover:border-black">
            <p className="font-normal font-sans text-sm">Request Access</p>
            <FaArrowRightLong className="fill-current w-4 h-4 mt-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
