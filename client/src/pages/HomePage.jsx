import React from "react";
import HeroSection from '../components/HeroSection';
import AboutSection from "../components/AboutSection";
import ImageSlider from "../components/ImageSlider";
import OurServices from "../components/OurServices";
import ContactInfo from "../components/ContactInfo"


function HomePage() {
    return (
      <div  className="bg-[#f5f5f5] min-h-screen">
        <HeroSection />
        <AboutSection />
        <ImageSlider />
        <OurServices />
        <ContactInfo />
      </div>
    );
  }

export default HomePage;



