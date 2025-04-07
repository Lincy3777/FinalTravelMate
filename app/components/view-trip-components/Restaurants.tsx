"use client";
import React from "react";

interface RestaurantsProps {
  restaurants: string[];
}

const Restaurants: React.FC<RestaurantsProps> = ({ restaurants }) => {
  return (
    <ul className="list-disc pl-8">
      {restaurants.map((restaurant, index) => (
        <li key={index}>{restaurant}</li>
      ))}
    </ul>
  );
};

export default Restaurants;
