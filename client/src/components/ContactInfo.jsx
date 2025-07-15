import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactInfo() {
  return (
    <section className="bg-[#f5f5f5] pt-6 pb-10 border-t-2" style={{ borderColor: '#333333' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700 text-lg items-start">
          {/* Email */}
          <div className="flex flex-col space-y-20">
            <p className="font-medium text-base text-gray-800">Email</p>
            <a href="mailto:hellostudio1510@gmail.com" className="text-gray-600 hover:text-gray-900 break-words">hellostudio1510@gmail.com</a>
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-20">
            <p className="font-medium text-base text-gray-800">Phone</p>
            <a href="tel:+254724407674" className="text-gray-600 hover:text-gray-900">+254 724 407 674</a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-20">
            <p className="font-medium text-base text-gray-800">Social Links</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/studiofifteenten/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900">
                <Instagram className="w-6 h-6" />
              </a>
              {/* <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900">
                <Linkedin className="w-6 h-6" />
              </a> */}
            </div>
          </div>

          {/* Contact Us link */}
          <div className="flex flex-col justify-start space-y-20">
            <Link to="/contact" className="flex items-center text-charcoal-700 hover:text-gray-500 font-medium text-base space-x-1">
              CONTACT US
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
