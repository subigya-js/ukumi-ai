import React from "react";
import Link from "next/link";

const TranFooter = () => {
  return (
    <div className="w-full h-[80px] bg-[#42376A] p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
      <p className="lg:text-sm">© 2024 TranscriptAI. All rights reserved.</p>
      <ul className="flex w-full justify-center gap-8 lg:w-[20%] lg:text-xs md:w-[30%]">
        <li className="hover:text-[#FCC25A]">
          <Link href="/">Terms of Services</Link>
        </li>
        <li className="hover:text-[#FCC25A]">
          <Link href="/">Privacy</Link>
        </li>
      </ul>
    </div>
  );
};

export default TranFooter;
