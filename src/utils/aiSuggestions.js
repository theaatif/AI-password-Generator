const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-password-generator.onrender.com/api/generate-password";

export async function getGeminiPassword(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error("AI API error");
    const data = await response.json();
    return data.password || "";
  } catch (err) {
    return "";
  }
}
