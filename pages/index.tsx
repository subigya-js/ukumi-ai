import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { AutomatedVideoCreation } from '../components/AutomatedVideoCreation';
import { EnterpriseSection } from '../components/EnterpriseSection';
import { Footer } from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <img
        src="/images/banner-img1.svg"
        alt="Background"
        className="absolute -top-24 left-96 w-full h-auto z-0 max-lg:left-72 max-md:left-56 max-sm:left-24 "
        style={{ maxHeight: '100vh' }} 
      />
      <img
        src="/images/banner-img2.svg"
        alt="Background"
        className="absolute top-60 -left-[610px] max-lg:-left-[450px] max-md:-left-[300px] max-sm:-left-[200px] w-full h-auto z-0 "
        style={{ maxHeight: '100vh' }} 
      />
      <div className="relative z-10"> 
        <Header />
        <main>
          <Hero />
          <FeatureSection />
          {/* <AutomatedVideoCreation /> */}
          <EnterpriseSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
