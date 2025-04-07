// types/itineraryTypes.ts

export interface Restaurant {
  name: string;
  address: string;
  rating: number;
  description: string;
  imageUrl: string;
}

export interface Place {
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  ticketPrice: number;
  rating: number;
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  destination: string;
  days: number;
  budget: number;
  people: number;
  preferences?: string;

  activities: string; // Changed from `any` to `string` (you had it as string in the view page)
  restaurants: Restaurant[];
  places: Place[];

  createdAt: string;
  updatedAt: string;
}
