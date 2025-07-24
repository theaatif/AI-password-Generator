import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { calculateEntropy } from "../utils/entropyCalc";
import PasswordStrengthInfo from "./PasswordStrengthInfo";

const leetMap = {
  a: "@",
  e: "3",
  i: "1",
  o: "0",
  s: "$",
  t: "7",
  l: "1",
  b: "8",
  g: "9",
  z: "2",
  A: "@",
  E: "3",
  I: "1",
  O: "0",
  S: "$",
  T: "7",
  L: "1",
  B: "8",
  G: "9",
  Z: "2",
};

function leetify(str) {
  return str
    .split("")
    .map((c) => leetMap[c] || c)
    .join("");
}

const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Excellent"];

const LeetSpeakMutation = () => {
  const [input, setInput] = useState("");
  const [mutated, setMutated] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleMutate = () => {
    setMutated(leetify(input));
    setHasGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mutated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const entropy = calculateEntropy(mutated);
  const zxcvbnResult = zxcvbn(mutated);
  const strength = zxcvbnResult.score;
  const crackTime =
    zxcvbnResult.crack_times_display.offline_slow_hashing_1e4_per_second;

  return (
    <div className="backdrop-blur-lg bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-4 sm:p-8 max-w-md mx-4 sm:mx-auto transition-transform hover:scale-[1.025] hover:shadow-3xl mt-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-blue-900 drop-shadow">
        Leet-Speak Mutation
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-800">
          Enter Password
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-xl px-2 py-1 bg-white/80 text-blue-900 font-mono text-base"
        />
      </div>
      <button
        onClick={handleMutate}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-xl shadow font-semibold mb-4 hover:from-blue-700 hover:to-blue-500 transition text-base sm:text-lg"
      >
        {hasGenerated ? "Remutate" : "Mutate"}
      </button>
      {mutated && (
        <div className="mb-2 rounded-xl bg-white/80 border border-white/40 shadow p-2 sm:p-3 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type={show ? "text" : "password"}
            value={mutated}
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
      {mutated && (
        <PasswordStrengthInfo
          password={mutated}
          entropy={entropy}
          zxcvbnResult={zxcvbnResult}
        />
      )}
    </div>
  );
};

export default LeetSpeakMutation;
