"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "../constants/options";
import { toast } from "react-toastify";
import { sendTravelPrompt } from "../service/AIModal";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface FormData {
  location: string;
  totalDays: number;
  budget: string;
  traveler: string;
}

const CreateTrip: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<number[] | undefined>(undefined);
  const [locationValue, setLocationValue] = useState<string | undefined>(undefined);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>();

  const location = watch("location");
  const budget = watch("budget");
  const traveler = watch("traveler");

  useEffect(() => {
    const handleGeocode = async (address: string) => {
      const encodedAddress = encodeURIComponent(address);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setMapCenter([lat, lon]);
            setLocationValue(address);
          } else {
            toast("Address not found.");
          }
        }
      } catch (error) {
        console.error("Error during geocoding:", error);
        toast("Failed to geocode address. Please try again.");
      }
    };

    if (location) {
      handleGeocode(location);
    }
  }, [location]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const FINAL_PROMPT = AI_PROMPT(
        data.location,
        data.totalDays.toString(),
        data.traveler,
        data.budget
      );

      const responseText = await sendTravelPrompt(FINAL_PROMPT);
      const aiResponse = JSON.parse(responseText);

      const itineraryData = {
        ...aiResponse,
        location: data.location,
        days: Number(data.totalDays),
        budget: data.budget,
        people: Number(data.traveler),
      };

      const encodedItinerary = encodeURIComponent(JSON.stringify(itineraryData));
      router.push(`/view-trip?itinerary=${encodedItinerary}`);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate trip.");
    }
  };

  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🌍</h2>
      <p className="mt-2 text-gray-600 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col gap-10">
        {/* Destination Input */}
        <div className="mb-3">
          <Input
            id="location"
            placeholder="Destination"
            {...register("location", { required: true })}
          />
        </div>

        <Map center={mapCenter} locationValue={locationValue} />

        {/* Total Days Input */}
        <div>
          <label className="text-xl font-medium">
            How many days are you planning your trip?
          </label>
          <Input
            id="totalDays"
            type="number"
            min="1"
            placeholder="Total Days"
            {...register("totalDays", { required: true, min: 1 })}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <label className="text-xl my-3 font-medium">What is Your Budget?</label>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => setValue("budget", item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                  budget === item.title && "shadow-lg border-cyan-500"
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          {/* Traveler Selection */}
          <label className="text-xl font-medium my-3">Who do you plan on traveling with?</label>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => setValue("traveler", item.people.toString())}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                  traveler === item.people.toString() && "shadow-lg border-cyan-500"
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600"
        >
          Generate Trip
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
