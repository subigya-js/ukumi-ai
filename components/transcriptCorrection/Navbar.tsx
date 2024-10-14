"use client";

import React, { useState } from "react";
import { MdElectricBolt } from "react-icons/md";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
  
const Navbar = () => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const toggleMenu = () => {
    setNavMenuOpen(!navMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 64;
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
    setNavMenuOpen(false);
  };

  return (
    <div>
      <nav className="bg-[#42376A] py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="flex items-center text-white font-semibold text-2xl gap-2">
          <span className="text-yellow-400">
            <MdElectricBolt />
          </span>
          TranscriptAI
        </div>

        <div className="hidden md:flex px-4 justify-between items-center">
          <ul className="flex gap-6 text-white">
            <li
              className="cursor-pointer hover:text-[#FCC25A]"
              onClick={() => scrollToSection("problem")}
            >
              The Problem
            </li>
            <li
              className="cursor-pointer hover:text-[#FCC25A]"
              onClick={() => scrollToSection("solution")}
            >
              Our Solution
            </li>
            <li
              className="cursor-pointer hover:text-[#FCC25A]"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </li>
          </ul>
        </div>

        <div className="md:hidden text-white flex items-center z-10">
          <button onClick={toggleMenu}>
            {navMenuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden fixed top-14 right-0 w-[30%] transition-transform duration-300 ease-in-out ${
          navMenuOpen ? "translate-y-0 z-10" : "-translate-y-full z-0"
        }`}
      >
        <div className="bg-[#42376A] bg-opacity-80 py-4 px-4">
          <ul className="flex flex-col gap-4 text-white text-right text-[10px] sm:text-xl">
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("problem")}
            >
              The Problem
            </li>
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("solution")}
            >
              Our Solution
            </li>
            <li
              className="cursor-pointer"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
