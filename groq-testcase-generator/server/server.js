// ✅ Load environment variables from the root .env file
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure .env is loaded from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ✅ Imports
import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

// ✅ Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Verify that the API key is loaded
if (!process.env.GROQ_API_KEY) {
  console.error("❌ Missing GROQ_API_KEY in .env file");
  process.exit(1);
}

// ✅ Initialize Groq client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ API route
app.post("/api/generate", async (req, res) => {
  const { feature } = req.body;

  if (!feature || !feature.trim()) {
    return res.status(400).json({ error: "Feature description is required." });
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert QA engineer. Generate detailed test cases.",
        },
        {
          role: "user",
          content: `Generate detailed QA test cases for: ${feature}`,
        },
      ],
      temperature: 0.7,
    });

    const message = response.choices?.[0]?.message?.content || "No response received.";
    res.json({ output: message });
  } catch (error) {
    console.error("💥 API ERROR:", error);
    res.status(500).json({ error: "Failed to fetch from Groq API." });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
