import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error(" Missing API Key");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const apiUrl =
      "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-es-en";

    const response = await axios.post(
      apiUrl,
      { inputs: text }, // To make sure text is properly formatted
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(" API Response:", response.data);

    if (Array.isArray(response.data) && response.data[0]?.translation_text) {
      return NextResponse.json({ translatedText: response.data[0].translation_text });
    } else {
      console.error(" Unexpected API Response:", response.data);
      return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }
  } catch (error: any) {
    console.error(" Translation API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || "Translation request failed" },
      { status: 500 }
    );
  }
}
