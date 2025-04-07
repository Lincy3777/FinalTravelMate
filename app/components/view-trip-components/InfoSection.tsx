"use client";

import React from "react";
import { ItineraryWithRelations } from "../../types/itineraryTypes";

const InfoSection = ({ itinerary }: { itinerary: ItineraryWithRelations }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{itinerary.destination}</h2>
      <p className="text-gray-600 text-xl">
        {itinerary.days} days, {itinerary.budget} budget, {itinerary.people} people
      </p>
    </div>
  );
};

export default InfoSection;
