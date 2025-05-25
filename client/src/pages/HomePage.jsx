import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import HeroSection from '../components/HeroSection';
import AboutSection from "../components/AboutSection";
import ImageSlider from "../components/ImageSlider";
import OurServices from "../components/OurServices";
import ContactInfo from "../components/ContactInfo"


function HomePage() {
    return (
      <div  className="bg-[#f5f5f5] min-h-screen">
        <NavigationMenu />
        <HeroSection />
        <AboutSection />
        <ImageSlider />
        <OurServices />
        <ContactInfo />
      </div>
    );
  }

export default HomePage;



