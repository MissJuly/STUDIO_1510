import React from 'react';
import './HeroSection.css';
import heroBG from '../assets/hero-bg.jpg'

function HeroSection() {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroBG})` }}>
      <div className="overlay">
        <h1>Humans spend nearly 90% of their lives indoors, making design of our built environment not just a luxury, but a fundamental part of our well-being, productivity and happiness.
        </h1>
        <button className="hero-button">START YOUR PROJECT</button>
      </div>
    </div>
  );
}

export default HeroSection;

