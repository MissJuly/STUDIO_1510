import { useState } from "react";
import { X, Menu, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo.png";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* Logo & Menu Container */}
    <div className="w-full bg-[#f5f5f5] flex items-center justify-between py-10 px-10">
      {/* Logo in Top-Left */}
      <img src={logo} alt="Logo" className="h-28 w-auto fixed left-10 " />

      {/* Open Menu Button */}
      {!isOpen && (
        <button
          className="text-[#333333] text-3xl fixed right-10 top-6"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={36} strokeWidth={0.75} />
        </button>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>

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
          <a href="#" className="hover:text-[#333333] transition duration-200">
            Home
          </a>
          <a href="#" className="hover:text-[#333333] transition duration-200">
            Portfolio
          </a>
          <a href="#" className="hover:text-[#333333] transition duration-200">
            Shop
          </a>
          <a href="#" className="hover:text-[#333333] transition duration-200">
            About
          </a>
          <a href="#" className="hover:text-[#333333] transition duration-200">
            Contacts
          </a>
        </nav>
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-14">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={30} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={30} className="text-[#bbbbbb] hover:text-[#333333] transition duration-200" />
          </a>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
