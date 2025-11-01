import React from "react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-gray-300 py-10 mt-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">TechBuild</h2>
          <p className="text-sm leading-relaxed">
            Build your dream PC with top-tier components.  
            Customize, compare, and create your perfect setup easily.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/builder" className="hover:text-white">Build PC</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
       
      </div>

      <Divider className="bg-gray-700 my-6" />

      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Asif</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
