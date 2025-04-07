import React from "react";
import Button from "../components/Button";
import Link from "next/link";

const Itinerary: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center mx-57 gap-9 bg-cover bg-center h-screen relative"
      style={{
        backgroundImage: 'url(/images/travel-concept.jpg)',
      }}
    >
      {/* Full overlay for opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content starts right after the navbar */}
      <div className="relative z-10 flex flex-col items-center text-center mt-0">
        <h1 className="font-extrabold text-[50px] text-white">
          <span>Discover Your Next Adventure with AI:</span>
          <br />
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-xl text-gray-200">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Link href="/create-trip">
          <Button 
            label="Generate an itinerary" 
            className="mt-5 px-10 py-3"
          />
        </Link>
      </div>
    </div>
  );
};

export default Itinerary;