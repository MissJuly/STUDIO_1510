import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import HeroSection from './components/HeroSection'

function App() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <NavigationMenu />
      <HeroSection />
    </div>
  );
}

export default App;

