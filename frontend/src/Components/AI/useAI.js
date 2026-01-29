import { useState } from "react";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const askAI = async (payload) => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/ai-help`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setResult(data.result || "No response from AI");
    } catch {
      setResult("AI service failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { askAI, loading, result };
}
