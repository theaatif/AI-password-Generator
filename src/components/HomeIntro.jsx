import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🔒",
    title: "Random Password",
    desc: "Generate strong, random passwords with custom length and character sets.",
    link: "/random",
  },
  {
    icon: "🎲",
    title: "Passphrase (Diceware)",
    desc: "Create easy-to-remember passphrases using random words and separators.",
    link: "/passphrase",
  },
  {
    icon: "🧩",
    title: "Pattern-Based",
    desc: "Build passwords from patterns like adjective+noun+number+symbol.",
    link: "/pattern",
  },
  {
    icon: "💬",
    title: "Leet-Speak",
    desc: "Mutate your password into leet-speak for extra complexity.",
    link: "/leet",
  },
  {
    icon: "🤖",
    title: "AI-Themed",
    desc: "Generate passwords based on your custom theme or prompt.",
    link: "/ai",
  },
  {
    icon: "🔠",
    title: "Custom Charset",
    desc: "Use your own character set for maximum control.",
    link: "/charset",
  },
];

const HomeIntro = () => (
  <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-900 via-blue-700 to-purple-800 relative overflow-hidden">
    {/* Hero Section */}
    <div className="w-full flex flex-col items-center justify-center pt-20 md:pt-28 pb-12 md:pb-20 px-2 sm:px-4">
      <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-white text-center drop-shadow-2xl mb-4 md:mb-6 tracking-tight leading-tight">
        <span className="block">Welcome to</span>
        <span className="text-yellow-300">PassGen</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-3xl text-white/90 text-center mb-6 md:mb-10 max-w-2xl font-medium drop-shadow-lg">
        Your privacy-focused, modern password and passphrase generator suite.
      </p>
      <Link
        to="/random"
        className="bg-yellow-300 text-blue-900 font-extrabold px-6 py-3 md:px-12 md:py-5 rounded-full shadow-2xl hover:bg-yellow-400 transition text-lg md:text-2xl border-4 border-yellow-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-200"
      >
        Start Generating Passwords
      </Link>
    </div>
    {/* Info Section */}
    <div className="relative z-10 w-full flex flex-col items-center px-2 sm:px-4 -mt-8 md:-mt-16 pb-2">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
        <div className="rounded-3xl bg-white/90 shadow-2xl p-5 md:p-8 flex flex-col items-start border border-blue-200">
          <span className="text-2xl md:text-3xl mb-2">🔢</span>
          <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
            What is Entropy?
          </h2>
          <p className="text-blue-900 text-base md:text-lg font-medium">
            Entropy measures password unpredictability. Higher entropy = harder
            to guess. Aim for 60+ bits for strong security.
          </p>
        </div>
        <div className="rounded-3xl bg-white/90 shadow-2xl p-5 md:p-8 flex flex-col items-start border border-blue-200">
          <span className="text-2xl md:text-3xl mb-2">⏳</span>
          <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">
            What is Crack Time?
          </h2>
          <p className="text-blue-900 text-base md:text-lg font-medium">
            Crack time estimates how long it would take to guess your password.
            Longer is better. Prefer passwords with years (not days or hours) of
            crack time.
          </p>
        </div>
      </div>
      {/* Features Section - swipeable on mobile, grid on md+ */}
      <div className="relative w-full flex md:justify-center justify-start">
        {/* Arrow indicators for swipe (mobile only) */}
        <div className="absolute -top-8 left-0 right-0 flex justify-between items-center px-4 md:hidden pointer-events-none select-none z-10">
          <span className="text-3xl text-blue-300 drop-shadow">&#8592;</span>
          <span className="text-3xl text-blue-300 drop-shadow">&#8594;</span>
        </div>
        <div className="max-w-6xl md:grid md:grid-cols-3 md:justify-center gap-6 md:gap-10 mb-10 md:mb-20 flex md:flex-none justify-start overflow-x-auto md:overflow-visible space-x-4 md:space-x-0 snap-x snap-mandatory mt-6 md:mt-0 pt-2 pl-4 pr-4 md:pl-0 md:pr-0">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-3xl bg-white/90 shadow-xl p-5 md:p-8 flex flex-col items-center text-center border border-blue-200 transition-transform md:hover:-translate-y-2 md:hover:scale-105 md:hover:shadow-2xl ${
                i % 2 === 1 ? "md:mt-8" : ""
              } min-w-[90vw] md:min-w-0 snap-start`}
              style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)" }}
            >
              <span className="text-3xl md:text-5xl mb-2 md:mb-3">
                {f.icon}
              </span>
              <h3 className="text-lg md:text-2xl font-bold text-blue-800 mb-1 md:mb-2 tracking-wide">
                {f.title}
              </h3>
              <p className="text-blue-900 text-base md:text-lg font-medium mb-3 md:mb-4">
                {f.desc}
              </p>
              <Link
                to={f.link}
                className="mt-auto bg-blue-600/90 text-white font-semibold px-4 py-2 md:px-6 md:py-2 rounded-full shadow hover:bg-blue-700/90 transition text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Try {f.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HomeIntro;
