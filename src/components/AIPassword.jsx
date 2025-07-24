import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { calculateEntropy } from "../utils/entropyCalc";
import PasswordStrengthInfo from "./PasswordStrengthInfo";
import { getGeminiPassword } from "../utils/aiSuggestions";

const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Excellent"];

const AIPassword = () => {
  const [prompt, setPrompt] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePassword = async () => {
    setLoading(true);
    setError("");
    let aiPassword = "";
    try {
      const instruction = `Generate a strong, creative password inspired by this theme: "${prompt}". The password should be exactly 10 characters long, using a mix of letters, numbers, and symbols. Only return the password, nothing else.`;
      aiPassword = await getGeminiPassword(instruction);
      // Ensure the password is exactly 10 characters if Gemini returns something
      if (aiPassword && aiPassword.length !== 10) {
        aiPassword = aiPassword.replace(/\s/g, ""); // Remove spaces
        if (aiPassword.length > 10) {
          aiPassword = aiPassword.slice(0, 10);
        } else if (aiPassword.length < 10) {
          // Pad with random chars if too short
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
          while (aiPassword.length < 10) {
            aiPassword += chars.charAt(
              Math.floor(Math.random() * chars.length)
            );
          }
        }
      }
    } catch (err) {
      setError("AI service error.");
    }
    setLoading(false);
    if (!aiPassword) {
      // fallback demo
      const words = prompt.split(/\s+/).filter(Boolean);
      const base = words.map((w) => w.slice(0, 3)).join("");
      const num = Math.floor(Math.random() * 1000);
      const symbol = "!@#$%&*"[Math.floor(Math.random() * 7)];
      aiPassword = base + num + symbol;
      setError("AI service unavailable, using demo password.");
    } else {
      setError("");
    }
    setPassword(aiPassword);
    setHasGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const entropy = calculateEntropy(password);
  const zxcvbnResult = zxcvbn(password);

  return (
    <div className="backdrop-blur-lg bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-4 sm:p-8 max-w-md mx-4 sm:mx-auto transition-transform hover:scale-[1.025] hover:shadow-3xl mt-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-blue-900 drop-shadow">
        AI-Themed Password Generator
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-blue-800">
          Describe your theme (e.g., space anime):
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border rounded-xl px-2 py-1 bg-white/80 text-blue-900 text-base"
        />
      </div>
      <button
        onClick={generatePassword}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-xl shadow font-semibold mb-4 hover:from-blue-700 hover:to-blue-500 transition text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading
          ? "Generating..."
          : hasGenerated
          ? "Regenerate Password"
          : "Generate Password"}
      </button>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      {password && (
        <div className="mb-2 rounded-xl bg-white/80 border border-white/40 shadow p-2 sm:p-3 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type={show ? "text" : "password"}
            value={password}
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
      {password && (
        <PasswordStrengthInfo
          password={password}
          entropy={entropy}
          zxcvbnResult={zxcvbnResult}
        />
      )}
    </div>
  );
};

export default AIPassword;
