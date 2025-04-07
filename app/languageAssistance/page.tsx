"use client";

import React from 'react';
import Button from "../components/Button";
import { useRouter } from "next/navigation"; // For navigation within the app

const LanguageAssistancePage: React.FC = () => {
    const router = useRouter();

    const handleLearnLanguage = () => {
        window.location.href = "https://www.duolingo.com"; 
    };

    const handleUseTranslator = () => {
        router.push("/translator"); 
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen relative bg-cover bg-center"
            style={{
                backgroundImage: 'url(/images/languageAssistant.jpg)',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="font-extrabold text-[40px] text-white mb-4">
                    Imagine the possibilities: languages without limits, adventures without end.
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                    Empower yourself with language skills or break down communication barriers.
                </p>
                <div className="flex justify-center space-x-8"> 
                    <Button
                        label="Learn A New Language"
                        onClick={handleLearnLanguage}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    />
                    <Button
                        label="Use Translator"
                        onClick={handleUseTranslator}
                        className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default LanguageAssistancePage;
