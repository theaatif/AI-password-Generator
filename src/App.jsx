import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeIntro from "./components/HomeIntro";
import RandomPassword from "./components/RandomPassword";
import PassphraseGenerator from "./components/PassphraseGenerator";
import PatternPassword from "./components/PatternPassword";
import LeetSpeakMutation from "./components/LeetSpeakMutation";
import AIPassword from "./components/AIPassword";
import UserCharsetPassword from "./components/UserCharsetPassword";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full px-0 py-0">
        <Routes>
          <Route path="/" element={<HomeIntro />} />
          <Route path="/random" element={<RandomPassword />} />
          <Route path="/passphrase" element={<PassphraseGenerator />} />
          <Route path="/pattern" element={<PatternPassword />} />
          <Route path="/leet" element={<LeetSpeakMutation />} />
          <Route path="/ai" element={<AIPassword />} />
          <Route path="/charset" element={<UserCharsetPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
