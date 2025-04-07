"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ItineraryData {
  activities: string;
  restaurants?: {
    name: string;
    address: string;
    rating: number;
    description: string;
    imageUrl: string;
  }[];
  places?: {
    name: string;
    description: string;
    coordinates: { lat: number; lng: number };
    imageUrl: string;
    ticketPrice: number;
    rating: number;
  }[];
  location: string;
  days: number;
  budget: string;
  people: number;
  tripDetails?: {
    location: string;
    duration: string;
    budget: string;
    travelers: string;
  };
  schedule?: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  notes?: string[];
}

const ViewTrip: React.FC = () => {
  const searchParams = useSearchParams();
  const itineraryEncoded = searchParams ? searchParams.get("itinerary") : null;
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    console.log("itineraryEncoded:", itineraryEncoded);

    if (itineraryEncoded) {
      try {
        const decodedItinerary = decodeURIComponent(itineraryEncoded);
        console.log("Decoded itinerary:", decodedItinerary);

        const parsedItinerary: ItineraryData = JSON.parse(decodedItinerary);
        // console.log("Parsed itinerary:", parsedItinerary);

        setItinerary(parsedItinerary);
      } catch (error) {
        // console.error("Error parsing itinerary:", error);
        toast.error("Failed to load itinerary.");
      }
    }
    setHasRendered(true);
  }, [itineraryEncoded, router]);

  const fetchImage = async (searchTerm: string, key: string) => {
    // console.log(`Fetching image for: ${searchTerm}`);

    try {
      const response = await fetch(`/api/unsplash?searchTerm=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Image data for ${searchTerm}:`, data);

        if (data.results && data.results.length > 0) {
          setImageUrls((prevImageUrls) => {
            console.log("Setting imageUrls for", key, data.results[0].urls.regular);
            return {
              ...prevImageUrls,
              [key]: data.results[0].urls.regular,
            };
          });
          console.log("imageUrls state:", imageUrls);
        }
      } else {
        console.error(`Failed to fetch image for ${searchTerm}: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (itinerary) {
      // console.log("Itinerary data available, fetching images...");

      itinerary.restaurants?.forEach((restaurant) => {
        if (!imageUrls[restaurant.name]) {
          fetchImage(restaurant.name, restaurant.name);
        }
      });

      itinerary.places?.forEach((place) => {
        if (!imageUrls[place.name]) {
          fetchImage(place.name, place.name);
        }
      });
    }
  }, [itinerary, imageUrls]);

  if (!itinerary || !hasRendered) {
    console.log("Loading itinerary...");
    return <div className="p-4">Loading itinerary...</div>;
  }

  console.log("Rendering itinerary:", itinerary);

  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <h2 className="font-bold text-3xl">Your Trip to {itinerary.location} ✈️</h2>
      <p className="mt-2 text-gray-600 text-xl">
        {itinerary.days} days, {itinerary.people} people, {itinerary.budget} budget.
      </p>

      {itinerary.activities && (
        <div className="mt-8">
          <h3 className="font-semibold text-2xl">Activities</h3>
          <p className="mt-2">{itinerary.activities}</p>
        </div>
      )}

      {itinerary.restaurants && (
        <div className="mt-8">
          <h3 className="font-semibold text-2xl">Restaurants</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itinerary.restaurants.map((restaurant, index) => (
              <div key={index} className="border rounded-lg p-4">
                <img
                  src={imageUrls[restaurant.name] || "/images/Restaurant-placeholder.jpg"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h4 className="font-semibold text-lg">{restaurant.name}</h4>
                <p className="text-sm text-gray-500">{restaurant.address}</p>
                <p className="text-sm">Rating: {restaurant.rating}</p>
                <p className="text-sm mt-2">{restaurant.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {itinerary.places && (
        <div className="mt-8">
          <h3 className="font-semibold text-2xl">Places to Visit</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itinerary.places.map((place, index) => (
              <div key={index} className="border rounded-lg p-4">
                <img
                  src={imageUrls[place.name] || "/images/travel.jpg"}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h4 className="font-semibold text-lg">{place.name}</h4>
                <p className="text-sm text-gray-500">{place.description}</p>
                <p className="text-sm">Rating: {place.rating}</p>
                <p className="text-sm">Ticket Price: ${place.ticketPrice}</p>
                <p className="text-sm">Coordinates: {place.coordinates.lat}, {place.coordinates.lng}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTrip;


