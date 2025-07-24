import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { calculateEntropy } from "../utils/entropyCalc";
import PasswordStrengthInfo from "./PasswordStrengthInfo";

const demoWordlist = [
  "apple",
  "banana",
  "cat",
  "dog",
  "eagle",
  "fish",
  "grape",
  "house",
  "ice",
  "jungle",
  "kite",
  "lemon",
  "monkey",
  "night",
  "orange",
  "piano",
  "queen",
  "river",
  "star",
  "tree",
  "umbrella",
  "violin",
  "wolf",
  "xray",
  "yarn",
  "zebra",
];
const separators = ["", "-", "_", "!", "@", "#", "1", "2", "3"];

const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Excellent"];

function getRandomWords(count, wordlist) {
  const words = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * wordlist.length);
    words.push(wordlist[idx]);
  }
  return words;
}

const PassphraseGenerator = () => {
  const [numWords, setNumWords] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [passphrase, setPassphrase] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("random"); // 'random' or 'custom'
  const [customWords, setCustomWords] = useState(["", "", "", ""]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleCustomWordChange = (idx, value) => {
    const updated = [...customWords];
    updated[idx] = value;
    setCustomWords(updated);
  };

  const generatePassphrase = () => {
    let words;
    if (mode === "custom") {
      words = customWords.map((w) => w.trim()).filter(Boolean);
      if (words.length !== numWords) return setPassphrase("");
    } else {
      words = getRandomWords(numWords, demoWordlist);
    }
    setPassphrase(words.join(separator));
    setHasGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const entropy = calculateEntropy(passphrase);
  const zxcvbnResult = zxcvbn(passphrase);
  const strength = zxcvbnResult.score;
  const crackTime =
    zxcvbnResult.crack_times_display.offline_slow_hashing_1e4_per_second;

  return (
    <div className="backdrop-blur-lg bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-4 sm:p-8 max-w-md mx-4 sm:mx-auto transition-transform hover:scale-[1.025] hover:shadow-3xl mt-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-blue-900 drop-shadow">
        Passphrase (Diceware) Generator
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-800">
          Number of Words: <span className="font-bold">{numWords}</span>
        </label>
        <input
          type="range"
          min={4}
          max={8}
          value={numWords}
          onChange={(e) => setNumWords(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>
      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="mode"
            value="random"
            checked={mode === "random"}
            onChange={() => setMode("random")}
          />
          <span>Random {numWords} words</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="mode"
            value="custom"
            checked={mode === "custom"}
            onChange={() => setMode("custom")}
          />
          <span>Enter my own {numWords} words</span>
        </label>
      </div>
      {mode === "custom" && (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Array.from({ length: numWords }).map((_, idx) => (
            <input
              key={idx}
              type="text"
              value={customWords[idx] || ""}
              onChange={(e) => handleCustomWordChange(idx, e.target.value)}
              placeholder={`Word ${idx + 1}`}
              className="w-full border rounded px-2 py-1 bg-white/80 text-blue-900 text-base"
            />
          ))}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-800">
          Separator
        </label>
        <select
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
          className="w-full border rounded-xl px-2 py-1 bg-white/80 text-blue-900 text-base"
        >
          {separators.map((sep) => (
            <option key={sep} value={sep}>
              {sep === "" ? "(none)" : sep}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={generatePassphrase}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-xl shadow font-semibold mb-4 hover:from-blue-700 hover:to-blue-500 transition text-base sm:text-lg"
      >
        {hasGenerated ? "Regenerate Passphrase" : "Generate Passphrase"}
      </button>
      {passphrase && (
        <div className="mb-2 rounded-xl bg-white/80 border border-white/40 shadow p-2 sm:p-3 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type={show ? "text" : "password"}
            value={passphrase}
            readOnly
            className="w-full px-2 py-1 border rounded-xl bg-white/90 text-blue-900 font-mono text-base"
          />
          <div className="flex flex-row space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShow((s) => !s)}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition w-20"
            >
              {show ? "Hide" : "Show"}
            </button>
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition w-20"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
      {passphrase && (
        <PasswordStrengthInfo
          password={passphrase}
          entropy={entropy}
          zxcvbnResult={zxcvbnResult}
        />
      )}
    </div>
  );
};

export default PassphraseGenerator;
