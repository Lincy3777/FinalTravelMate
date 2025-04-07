// // Define the structure of budget options
// interface BudgetOption {
//     id: number;
//     title: string;
//     desc: string;
//     icon: string;
//     value: number;
//   }
  
//   // Define the structure of travel options
//   interface TravelOption {
//     id: number;
//     title: string;
//     desc: string;
//     icon: string;
//     people: number;
//   }
  
//   // Define the structure of AI prompt
//   interface AI_Prompt {
//     location: string;
//     totalDays: string;
//     traveler: string;
//     budget: string;
//   }
  
//   // Budget options
//   export const SelectBudgetOptions: BudgetOption[] = [
//     {
//       id: 1,
//       title: 'Cheap',
//       desc: "Stay conscious of costs",
//       icon: '💵',
//       value: 1000,
//     },
//     {
//       id: 2,
//       title: 'Moderate',
//       desc: "Keep cost on the average side",
//       icon: '💰',
//       value: 2000,
//     },
//     {
//       id: 3,
//       title: 'Luxury',
//       desc: "Don't worry about cost",
//       icon: '💎',
//       value: 5000,
//     },
//   ];
  
//   // Travel options
//   export const SelectTravelList: TravelOption[] = [
//     {
//       id: 1,
//       title: 'Just Me',
//       desc: "A solo traveler",
//       icon: '🚶‍♀️',
//       people: 1,
//     },
//     {
//       id: 2,
//       title: 'A couple',
//       desc: "Two travelers",
//       icon: '👫',
//       people: 2,
//     },
//     {
//       id: 3,
//       title: 'Family',
//       desc: "A group of fun-loving adventurers",
//       icon: '🏡',
//       people: 4,
//     },
//     {
//       id: 4,
//       title: 'Friends',
//       desc: "A bunch of thrill-seekers",
//       icon: '👩‍👩‍👦‍👦',
//       people: 5,
//     },
//   ];
  
//   // AI prompt template
//   // export const AI_PROMPT = 'Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';

//   // AI prompt template
//   export const AI_PROMPT = (location: string, totalDays: string, traveler: string, budget: string) => {
//     return `Create a detailed ${totalDays}-day itinerary for ${traveler} people visiting ${location}
//     with a budget of ${budget}. Include popular restaurants and activities.
//     When providing image URLs, please prioritize direct links to .jpg or .png files from reputable sources like official tourism websites or well-known travel blogs.
//     Ensure the image URLs are stable and likely to remain accessible. Return in JSON format:
//     {
//       "activities": string,
//       "restaurants": [
//         { "name": string, "address": string, "rating": number, "description": string, "imageUrl": string },
//         ...
//       ],
//       "places": [
//         { "name": string, "description": string, "coordinates": { "lat": number, "lng": number }, "imageUrl": string, "ticketPrice": number, "rating": number },
//         ...
//       ]
//     }`;
//   };



// Budget Option structure
export interface BudgetOption {
  id: number;
  title: string;
  desc: string;
  icon: string;
  value: number;
}

// Travel Option structure
export interface TravelOption {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: number;
}

// AI Prompt input structure
export interface AI_PromptInput {
  location: string;
  totalDays: string;
  traveler: string; // can keep as string if you're displaying "Couple", "Family" etc.
  budget: string;
}

export const SelectBudgetOptions: BudgetOption[] = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
    value: 1000,
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
    value: 2000,
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💎",
    value: 5000,
  },
];

export const SelectTravelList: TravelOption[] = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler",
    icon: "🚶‍♀️",
    people: 1,
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travelers",
    icon: "👫",
    people: 2,
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: "🏡",
    people: 4,
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "👩‍👩‍👦‍👦",
    people: 5,
  },
];

export const AI_PROMPT = (
  location: string,
  totalDays: string,
  traveler: string,
  budget: string
): string => {
  return `Create a detailed ${totalDays}-day travel itinerary for ${traveler} people visiting ${location} with a ${budget} budget.

Include:
- Popular **activities** (in a short summary string),
- A list of **restaurants** with: name, address, rating, short description, and image URL,
- A list of **places to visit** with: name, description, latitude/longitude, rating, ticket price, and image URL.

Format your response as valid JSON like:
{
  "activities": string,
  "restaurants": [
    {
      "name": string,
      "address": string,
      "rating": number,
      "description": string,
      "imageUrl": string
    }
  ],
  "places": [
    {
      "name": string,
      "description": string,
      "coordinates": { "lat": number, "lng": number },
      "imageUrl": string,
      "ticketPrice": number,
      "rating": number
    }
  ]
}

Use direct image URLs (ending in .jpg/.png) from reliable sources. Avoid markdown or code block formatting.`;
};
