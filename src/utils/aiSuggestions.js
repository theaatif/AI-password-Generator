export async function getGeminiPassword(prompt) {
  try {
    const response = await fetch(
      "http://localhost:3001/api/generate-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok) throw new Error("AI API error");
    const data = await response.json();
    return data.password || "";
  } catch (err) {
    console.error("[Gemini] Error in getGeminiPassword (proxy)", err);
    return "";
  }
}
