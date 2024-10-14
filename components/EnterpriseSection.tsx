import { Button } from "./ui/button";
import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
interface FeatureProps {
  icon: React.ReactNode;
  text: string;
}

{
  /* <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-orange-500">Scale your video strategy</h2> */
}

export function EnterpriseSection() {
  return (
    <section className="container mx-auto px-4 border-t-2 border-[#2e2e2e] py-20">
      <div className="flex gap-4 max-md:flex-col">
        {/* First Div */}
        <div className="flex flex-col gap-8 items-start rounded-md p-6 max-sm:p-2 w-1/2 max-md:w-full">
          <h2 className="text-xl font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-purple-500">
            FOR ENTERPRISE
          </h2>
          <h1 className="text-5xl font-sans font-bold text-white max-sm:text-3xl  max-sm:max-w-full">
            Scale your video startegy
          </h1>
          <p className="text-lg font-sans max-sm:text-base">
            Dramatically reduce costs, accelerate AI- powered operation and
            unlock new possibilities in content creation
          </p>
          <Link href="https://form.typeform.com/to/NSwjHJ0l">
            <div className="border-2  cursor-pointer border-white text-white flex py-3 px-4 justify-center items-center gap-4 rounded text-center transition-all duration-300 hover:bg-white hover:text-black hover:border-black">
              <p className="font-normal font-sans text-sm">Request Enterprise Demo</p>
              <FaArrowRightLong className="fill-current w-4 h-4 mt-1" />
            </div>
          </Link>
        </div>

        {/* Second Div */}
        <div className="flex flex-col justify-between items-start w-1/2 max-md:w-full bg-[#121212] border border-[#2e2e2e] rounded-md p-6">
          <div className="flex justify-between items-center gap-4">
            <div className="bg-black border border-[#2e2e2e] rounded-md flex justify-center items-center p-2">
              <img src="/images/3.svg" alt="img" className="w-20 h-20" />
            </div>
            <h1 className="font-sans">Proprietary Data Structure</h1>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="bg-black border border-[#2e2e2e] rounded-md flex justify-center items-center p-2">
              <img src="/images/2.svg" alt="img" className="w-20 h-20" />
            </div>
            <h1 className="font-sans">10X Faster Processing</h1>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="bg-black border border-[#2e2e2e] rounded-md flex justify-center items-center p-2">
              <img src="/images/1.svg" alt="img" className="w-20 h-20" />
            </div>
            <h1 className="font-sans">70% Cost Reduction </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
