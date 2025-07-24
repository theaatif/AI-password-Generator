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
    <div className="flex justify-center space-x-3 mt-1">
      <a
        href="https://github.com/theaatif/AI-password-Generator"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 text-lg hover:text-yellow-300 transition"
        title="View on GitHub"
      >
        {/* GitHub SVG icon */}
        <svg
          className="w-5 h-5 mr-1"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
        </svg>
        <span className="text-sm font-semibold">Secure & Open Source</span>
      </a>
    </div>
  </footer>
);

export default Footer;
