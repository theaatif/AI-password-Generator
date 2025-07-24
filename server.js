import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Vite local dev
  "https://aipassgenearator.netlify.app", // Netlify production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.post("/api/generate-password", async (req, res) => {
  console.log("==== /api/generate-password endpoint hit ====");
  const { prompt } = req.body;
  console.log("Prompt received:", prompt);
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const data = await response.json();
    console.log("Gemini API response:", data);
    const password = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Password to return:", password);
    res.json({ password });
  } catch (err) {
    console.error("Error from Gemini API:", err);
    res.status(500).json({ error: "AI service error" });
  }
});

const PORT = process.env.PORT || 3001;
console.log("Server started and logging works!");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
