"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function RealTimeSpeechTranslator() {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let recognition: any = null;

    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "es-ES"; 

        recognition.onresult = (event: any) => {
          let transcript = event.results[event.results.length - 1][0].transcript;
          setTranscription(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech Recognition Error:", event);
          setIsListening(false);
        };
      }
    }

    if (isListening && recognition) {
      recognition.start();
    } else if (!isListening && recognition) {
      recognition.stop();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  const handleTranslate = async () => {
    setErrorMessage("");

    if (!transcription) {
      setErrorMessage("No speech detected. Please try again.");
      return;
    }

    try {
      const response = await axios.post("/api/translate", { text: transcription });

      if (response.data.translatedText) {
        setTranslatedText(response.data.translatedText);
      } else {
        setErrorMessage("Translation failed.");
      }
    } catch (error: any) {
      console.error("Translation Error:", error.response?.data || error.message);
      setErrorMessage("Failed to fetch translation.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen relative bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/languageAssistant.jpg)',
      }}
    >
      <div className="p-8 border rounded-lg shadow-md bg-white w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Real-Time Speech Translator</h2>

        <button
          onClick={() => setIsListening((prev) => !prev)}
          className={`w-full px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
            isListening ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>

        {transcription && (
          <div className="mt-4 p-3 border rounded bg-gray-100 text-left">
            <h3 className="text-lg font-bold">Transcription:</h3>
            <p>{transcription}</p>
          </div>
        )}

        <button
          onClick={handleTranslate}
          className="mt-4 w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Translate to English
        </button>

        {translatedText && (
          <div className="mt-4 p-3 border rounded bg-gray-100 text-left">
            <h3 className="text-lg font-bold">Translation:</h3>
            <p>{translatedText}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 border rounded bg-red-100 text-red-700">
            <h3 className="font-bold">Error:</h3>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
