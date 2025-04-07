// service/aiModal.ts
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.8,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

export async function sendTravelPrompt(prompt: string): Promise<string> {
  const chat = await model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `If I ask anything other than travelling, then respond with: "Invalid Request. This assistant only handles travel-related queries."`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `Okay, I will generate travel plans in JSON format and reject non-travel queries.`,
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
}
