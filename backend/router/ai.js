import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/ai-help", async (req, res) => {
  const { language, code, output, mode } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  const prompt =
    mode === "error"
      ? `
You are a senior programming mentor.

Language: ${language}

User Code:
${code}

Error Output:
${output}

Explain:
1. What the error means
2. Why it happened
3. How to fix it
4. Provide corrected code
`
      : `
You are a senior software engineer.

Language: ${language}

User Code:
${code}

Improve:
1. Code quality
2. Best practices
3. Performance if possible
Provide improved code
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default router;
