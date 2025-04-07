// types/itineraryTypes.ts
export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: string; // DateTime in Prisma is returned as a string
  endDate: string;   // DateTime in Prisma is returned as a string
  destination: string;
  days: number;
  budget: number;
  people: number;
  preferences?: string;
  activities: any; // JSON type can be represented as `any`
  restaurants: string[];
  places: string[];
  createdAt: string;
  updatedAt: string;
}
