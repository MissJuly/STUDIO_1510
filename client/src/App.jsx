import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import HeroSection from './components/HeroSection'
import AboutSection from "./components/AboutSection";
import ImageSlider from "./components/ImageSlider";

const sampleImages = [
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
];

function App() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <NavigationMenu />
      <HeroSection />
      <AboutSection />
      <ImageSlider images={sampleImages} />
    </div>
  );
}

export default App;

