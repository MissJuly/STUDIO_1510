import { Link } from 'react-router-dom';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Menu, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo.png";

function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleNavClick = (e, path) => {
    closeSidebar(); // close the menu first
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.reload(); // if same page, reload it
    } else {
      navigate(path); // if different page, navigate normally
    }
  };

  return (
    <>
      {/* Fixed Navbar Container */}
      <div className="fixed top-0 left-0 w-full bg-[#f5f5f5] flex items-center justify-between h-20 px-10 shadow-md z-30">
        {/* Logo */}
       <button
          onClick={(e) => handleNavClick(e, '/')}
          className="focus:outline-none"
        >
          <img src={logo} alt="Logo" className="h-28 w-auto" />
        </button>

        {/* Open Menu Button */}
        {!isOpen && (
          <button
            className="text-[#333333]"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={36} strokeWidth={0.75} />
          </button>
        )}
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-[#f5f5f5] shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col justify-center items-center`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-[#bbbbbb] hover:text-[#333333] m-6"
          onClick={() => setIsOpen(false)}
        >
          <X size={36} strokeWidth={1} />
        </button>

        {/* Navigation Links */}
      <nav className="flex flex-col items-center gap-8 text-3xl font-normal text-[#bbbbbb]">
        <button onClick={(e) => handleNavClick(e, "/")} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200">Home</button>
        <button onClick={(e) => handleNavClick(e, "/about")} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200">About</button>
        <button onClick={(e) => handleNavClick(e, "/portfolio")} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200">Portfolio</button>
        <button onClick={(e) => handleNavClick(e, "/shop")} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200">Products</button>
        <button onClick={(e) => handleNavClick(e, "/contact")} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200">Contact Us</button>
      </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mt-14">
          <a href="https://www.instagram.com/studiofifteenten/" target="_blank" rel="noopener noreferrer">
            <Instagram size={30} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200" />
          </a>
          {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={30} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200" />
          </a> */}
        </div>
      </div>
    </>
  );
}
export default NavigationMenu;
