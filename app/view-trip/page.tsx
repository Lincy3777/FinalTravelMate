"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

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
    if (itineraryEncoded) {
      try {
        const decodedItinerary = decodeURIComponent(itineraryEncoded);
        const parsedItinerary: ItineraryData = JSON.parse(decodedItinerary);
        setItinerary(parsedItinerary);
      } catch {
        toast.error("Failed to load itinerary.");
      }
    }
    setHasRendered(true);
  }, [itineraryEncoded, router]);

  const fetchImage = useCallback(async (searchTerm: string, key: string) => {
    try {
      const response = await fetch(`/api/unsplash?searchTerm=${encodeURIComponent(searchTerm)}`, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setImageUrls((prev) => ({
            ...prev,
            [key]: data.results[0].urls.regular,
          }));
        }
      } else {
        console.error(`Failed to fetch image for ${searchTerm}: ${response.status}`);
      }
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  }, []);

  useEffect(() => {
    if (itinerary) {
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
  }, [itinerary, fetchImage]);

  if (!itinerary || !hasRendered) {
    return <div className="p-4">Loading itinerary...</div>;
  }

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
                <Image
                  src={imageUrls[restaurant.name] || "/images/Restaurant-placeholder.jpg"}
                  alt={restaurant.name}
                  width={500}
                  height={300}
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
                <Image
                  src={imageUrls[place.name] || "/images/travel.jpg"}
                  alt={place.name}
                  width={500}
                  height={300}
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
