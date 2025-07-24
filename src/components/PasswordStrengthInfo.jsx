import React from "react";
import { useSpring, animated } from "@react-spring/web";

const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Excellent"];
const strengthIcons = ["🔴", "🟠", "🟡", "🔵", "🟢"];
const strengthColors = [
  "text-red-600",
  "text-orange-500",
  "text-yellow-500",
  "text-blue-500",
  "text-green-600",
];
const barColors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-green-500",
];

// Helper to convert crack time string to a number of years (approx)
function crackTimeToYears(str) {
  if (!str) return 0;
  if (str.includes("century")) return 100;
  if (str.includes("year")) return parseFloat(str) || 1;
  if (str.includes("month")) return 1 / 12;
  if (str.includes("day")) return 1 / 365;
  if (str.includes("hour")) return 1 / (365 * 24);
  if (str.includes("minute")) return 1 / (365 * 24 * 60);
  if (str.includes("second")) return 1 / (365 * 24 * 60 * 60);
  return 0;
}

export default function PasswordStrengthInfo({
  password,
  entropy,
  zxcvbnResult,
}) {
  if (!password) return null;
  const strength = zxcvbnResult.score;
  const crackTime =
    zxcvbnResult.crack_times_display.offline_slow_hashing_1e4_per_second;
  const crackYears = crackTimeToYears(crackTime);

  // Animations
  const barSpring = useSpring({ width: `${(strength + 1) * 20}%` });
  const entropySpring = useSpring({ width: `${Math.min(entropy, 100)}%` });
  const crackSpring = useSpring({
    width: `${Math.min(Math.log10(crackYears + 1) * 20, 100)}%`,
  });

  return (
    <div className="mb-4 mt-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${strengthColors[strength]}`}>
            {strengthIcons[strength]}
          </span>
          <span className={`text-lg font-bold ${strengthColors[strength]}`}>
            {strengthLabels[strength]}
          </span>
        </div>
        <span className="text-blue-900 font-semibold text-lg">
          {entropy.toFixed(1)} bits
        </span>
      </div>
      {/* Animated strength bar */}
      <div className="h-2 w-full bg-gray-200 rounded-xl mb-2 overflow-hidden">
        <animated.div
          className={`h-2 rounded-xl ${barColors[strength]}`}
          style={barSpring}
        />
      </div>
      {/* Entropy bar graph */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-blue-900 font-semibold mb-1">
          <span>Entropy</span>
          <span>{entropy.toFixed(1)} bits</span>
        </div>
        <div className="h-2 w-full bg-blue-100 rounded-xl overflow-hidden">
          <animated.div
            className="h-2 bg-blue-500 rounded-xl"
            style={entropySpring}
          />
        </div>
      </div>
      {/* Crack time bar graph (log scale) */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-blue-900 font-semibold mb-1">
          <span>Crack Time</span>
          <span>{crackTime}</span>
        </div>
        <div className="h-2 w-full bg-green-100 rounded-xl overflow-hidden">
          <animated.div
            className="h-2 bg-green-500 rounded-xl"
            style={crackSpring}
          />
        </div>
      </div>
      <div
        className={`text-sm font-medium ${
          entropy >= 80
            ? "text-green-700"
            : entropy >= 60
            ? "text-blue-700"
            : "text-orange-700"
        }`}
      >
        {entropy >= 80
          ? "Secure for banking"
          : entropy >= 60
          ? "Good for most sites"
          : "Consider a longer password"}
      </div>
    </div>
  );
}
