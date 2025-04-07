"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    console.log("Button clicked!"); 
    try {
      router.push("/listing");
      console.log("Navigation to /listing initiated."); //  Navigation initiation
    } catch (error) {
      console.error("Navigation to /listing failed:", error); // Navigation error
      if (error instanceof Error && error.message.includes("404")) {
        console.error("Possible 404 error: Check if /listing route exists in the app directory."); 
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(/images/travel.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Our Listings
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Explore our amazing listings and find your perfect match.
        </p>
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          View Listings
        </button>
      </div>
    </div>
  );
};

export default LandingPage;