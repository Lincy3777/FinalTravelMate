"use client";
import React from "react";

interface TripPlaceProps {
  places: string[];
  activities: string;
}

const TripPlace: React.FC<TripPlaceProps> = ({ places, activities }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Places to Visit:</h3>
      <ul className="list-disc pl-8">
        {places.map((place, index) => (
          <li key={index}>{place}</li>
        ))}
      </ul>
      
      <h3 className="text-lg font-medium mt-8 mb-4">Daily Activities:</h3>
      <p className="text-gray-600">{activities}</p>
    </div>
  );
};

export default TripPlace;
