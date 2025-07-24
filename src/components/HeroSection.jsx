import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="bg-gradient-to-br from-blue-700 via-blue-400 to-purple-400 text-white rounded-3xl shadow-xl p-8 mb-8 flex flex-col items-center justify-center animate-fade-in">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg text-center">
      Generate Strong, Unique Passwords Instantly
    </h1>
    <p className="text-lg md:text-xl font-medium mb-6 text-center max-w-2xl">
      Protect your accounts with modern password and passphrase generators,
      strength meters, and security tips. No data leaves your device.
    </p>
    <Link
      to="/"
      className="bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition text-lg"
    >
      Get Started
    </Link>
  </section>
);

export default HeroSection;
