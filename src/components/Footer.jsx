import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white text-center py-5  shadow-lg drop-shadow-md">
    <div className="flex flex-col items-center space-y-2">
      <span className="text-sm">
        &copy; {new Date().getFullYear()} PassGen. All rights reserved.
      </span>
      <span className="text-xs opacity-80">
        Crafted for security & creativity.
      </span>
    </div>
  </footer>
);

export default Footer;
