// @/service/AIModal.ts

// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// // Define the structure of a chat message
// interface ChatMessage {
//   role: "user" | "model";
//   parts: { text: string }[];
// }

// // Define the structure of the chat session
// interface ChatSession {
//   sendMessage: (message: string) => Promise<{ response: { text: string } }>;
//   history: ChatMessage[];
// }

// const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY;

// if (!apiKey) {
//   console.error("NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY is not set in the environment variables.");
//   throw new Error("API key is missing. Please set NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY in your .env file.");
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json", 
// };

// // Define initial chat history
// const initialChatHistory: ChatMessage[] = [
//   {
//     role: "user",
//     parts: [
//       {
//         text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a moderate budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.If i ask anything other  than travelling then respond with invalid request`,
//       },
//     ],
//   },
//   {
//     role: "model",
//     parts: [
//       {
//         text: `Okay, here's a comprehensive 3-day Las Vegas travel plan for a couple on a moderate budget, delivered in JSON format.  I've tried to balance iconic Vegas experiences with cost-effective choices.\n\n\`\`\`json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada",\n    "duration": "3 Days",\n    "budget": "Moderate (approx. $600 - $1200 total)",\n    "travelers": "Couple"\n  },\n  "hotelOptions": [\n    {\n      "hotelName": "Linq Hotel + Experience",\n      "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "priceRange": "$70 - $150 per night",\n      "hotelImageUrl": "https://www.caesars.com/content/dam/linq/hotel/hotel_hero.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1165,\n        "longitude": -115.1695\n      },\n      "rating": 4.0,\n      "description": "Modern hotel with a central location on the Strip. Features the High Roller observation wheel and a variety of dining and entertainment options.  Good for access to many attractions."\n    },\n    {\n      "hotelName": "Park MGM Las Vegas",\n      "hotelAddress": "3770 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "priceRange": "$90 - $200 per night",\n      "hotelImageUrl": "https://www.mgmresorts.com/content/dam/MGM/park-mgm/hotel/park-mgm-hotel-exterior.tif",\n      "geoCoordinates": {\n        "latitude": 36.1028,\n        "longitude": -115.1762\n      },\n      "rating": 4.3,\n      "description": "A stylish and smoke-free hotel on the Strip with a great pool area and easy access to T-Mobile Arena.  Features a good selection of restaurants and bars."\n    },\n    {\n      "hotelName": "Flamingo Las Vegas",\n      "hotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "priceRange": "$50 - $120 per night",\n      "hotelImageUrl": "https://www.caesars.com/content/dam/flamingolv/hotel/exterior/flamingo-exterior-16x7.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1171,\n        "longitude": -115.1755\n      },\n      "rating": 3.8,\n      "description": "Iconic hotel with a retro vibe and a central Strip location. Features a wildlife habitat and a variety of affordable dining options. A good choice for budget-conscious travelers."\n    },\n    {\n      "hotelName": "Treasure Island - TI Hotel & Casino",\n      "hotelAddress": "3300 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "priceRange": "$80 - $180 per night",\n      "hotelImageUrl": "https://book.treasureisland.com/wp-content/uploads/2023/12/TI-Hotel-Exterior-Day.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1245,\n        "longitude": -115.1755\n      },\n      "rating": 4.1,\n      "description": "Located on the north end of the Strip, Treasure Island offers comfortable rooms, a good selection of restaurants, and a lively casino. Good value for its location."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "Strip Exploration & High Roller Views",\n      "bestTimeToVisit": "Afternoon/Evening",\n      "activities": [\n        {\n          "placeName": "Welcome to Las Vegas Sign",\n          "placeDetails": "Iconic sign for a photo opportunity. Can be crowded, especially during peak hours.",\n          "placeImageUrl": "https://www.lasvegasnevada.gov/files/sharedassets/public/images/lv_sign-137.jpg",\n          "geoCoordinates": {\n            "latitude": 36.0829,\n            "longitude": -115.1734\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "travelTimeFromHotel": "10-20 minutes (depending on hotel location and transportation)"\n        },\n        {\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "Stunning floral displays that change seasonally. Free to enter.",\n          "placeImageUrl": "https://bellagio.mgmresorts.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/bellagio-conservatory-floral-display-interior.tif",\n          "geoCoordinates": {\n            "latitude": 36.1126,\n            "longitude": -115.1761\n          },\n          "ticketPricing": "Free",\n          "rating": 4.8,\n          "travelTimeFromPrevious": "15 minutes walking"\n        },\n        {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "Spectacular water show set to music. Free to watch. Shows every 30 minutes in the afternoon and every 15 minutes in the evening.",\n          "placeImageUrl": "https://bellagio.mgmresorts.com/content/dam/MGM/bellagio/entertainment/fountains-of-bellagio/exterior/bellagio-fountains-night-exterior.tif",\n          "geoCoordinates": {\n            "latitude": 36.1126,\n            "longitude": -115.1761\n          },\n          "ticketPricing": "Free",\n          "rating": 4.9,\n          "travelTimeFromPrevious": "Right next to Conservatory"\n        },\n        {\n          "placeName": "High Roller Observation Wheel",\n          "placeDetails": "Giant Ferris wheel offering panoramic views of the Las Vegas Strip. Consider going at sunset for the best experience.",\n          "placeImageUrl": "https://www.caesars.com/content/dam/linq/things-to-do/high-roller/high-roller-exterior-daytime.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1168,\n            "longitude": -115.1692\n          },\n          "ticketPricing": "$25 - $37 per person (depending on time of day)",\n          "rating": 4.6,\n          "travelTimeFromPrevious": "15-20 minutes walking/taxi from Bellagio"\n        },\n        {\n          "placeName": "Dinner at In-N-Out Burger (for budget-friendly option)",\n          "placeDetails": "Classic California burger chain with a cult following. A great affordable meal option.",\n          "placeImageUrl": "https://locations.in-n-out.com/Content/img/default/menu.png",\n          "geoCoordinates": {\n            "latitude": 36.1168,\n            "longitude": -115.1692\n          },\n          "ticketPricing": "$10-15",\n          "rating": 4.5,\n          "travelTimeFromPrevious": "next to High Roller"\n        }\n      ]\n    },\n    "day2": {\n      "theme": "Downtown & Fremont Street Experience",\n      "bestTimeToVisit": "Afternoon/Evening",\n      "activities": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A pedestrian mall with a giant video screen canopy and free nightly light shows.",\n          "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2023/07/Fremont-Street-Experience-at-night.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1700,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "Free (for the Fremont Street Experience itself)",\n          "rating": 4.7,\n          "travelTimeFromHotel": "20-30 minutes by car/taxi/rideshare from the Strip"\n        },\n        {\n          "placeName": "SlotZilla Zip Line",\n          "placeDetails": "Zip line attraction that launches you over Fremont Street.",\n          "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2014/01/slotzilla-photos-01.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1700,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "$39-$59 per person",\n          "rating": 4.3,\n          "travelTimeFromPrevious": "Located on Fremont Street"\n        },\n        {\n          "placeName": "Heart Attack Grill",\n          "placeDetails": "Controversial restaurant with extremely high-calorie burgers and a hospital theme.... A unique and memorable (but potentially unhealthy) experience.",\n          "placeImageUrl": "https://static.onecms.io/wp-content/uploads/sites/9/2018/03/heart-attack-grill-restaurant-las-vegas-FT-BLOG0318.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1700,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "$20-30 per person",\n          "rating": 3.8,\n          "travelTimeFromPrevious": "Located on Fremont Street"\n        },\n        {\n          "placeName": "Mob Museum",\n          "placeDetails": "Museum dedicated to the history of organized crime in America.",\n          "placeImageUrl": "https://themobmuseum.org/wp-content/uploads/2019/05/exterior-2019.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1711,\n            "longitude": -115.1405\n          },\n          "ticketPricing": "$31.95 per person",\n          "rating": 4.6,\n          "travelTimeFromPrevious": "5-10 minutes walking from Fremont Street"\n        },\n        {\n          "placeName": "Dinner at Nacho Daddy (Downtown)",\n          "placeDetails": "Enjoy delicious and creative nachos in downtown Las Vegas. A great value for a filling meal",\n          "placeImageUrl": "https://nachodaddy.com/wp-content/uploads/2021/11/downtown-las-vegas-1-1024x683.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1693,\n            "longitude": -115.1409\n          },\n          "ticketPricing": "$20-30 per person",\n          "rating": 4.4,\n          "travelTimeFromPrevious": "5-10 minutes walking from Mob museum"\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Relaxation & Optional Activities",\n      "bestTimeToVisit": "Morning/Afternoon",\n      "activities": [\n        {\n          "placeName": "Pool Day",\n          "placeDetails": "Relax and enjoy the pool at your hotel.  Most hotels have excellent pool facilities.",\n          "placeImageUrl": "Pool Image will depend on chosen Hotel",\n          "geoCoordinates": "Pool location depends on chosen hotel",\n          "ticketPricing": "Free (with hotel stay)",\n          "rating": 4.0,\n          "travelTimeFromHotel": "On Hotel"\n        },\n        {\n          "placeName": "Ethel M Chocolate Factory & Cactus Garden",\n          "placeDetails": "Free chocolate factory tour and a beautiful cactus garden to explore. Located a short drive from the Strip.",\n          "placeImageUrl": "https://ethelm.com/cdn/shop/files/2021_CactusGarden_WideShot_FINAL_2048x.jpg?v=1679013063",\n          "geoCoordinates": {\n            "latitude": 36.0509,\n            "longitude": -115.0626\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "travelTimeFromPrevious": "20-30 minutes by car/taxi/rideshare from the Strip"\n        },\n         {\n          "placeName": "Seven Magic Mountains",\n          "placeDetails": "Public art installation by Swiss artist Ugo Rondinone, comprised of seven colorful stacked boulder totems.",\n          "placeImageUrl": "https://sevenmagicmountains.com/wp-content/uploads/2016/04/0281_IMG_4031.jpg",\n          "geoCoordinates": {\n            "latitude": 35.9753,\n            "longitude": -115.0833\n          },\n          "ticketPricing": "Free",\n          "rating": 4.3,\n          "travelTimeFromPrevious": "20-30 minutes by car/taxi/rideshare from Ethel M Chocolate Factory & Cactus Garden"\n        },\n        {\n          "placeName": "Explore the Venetian/Palazzo Canals",\n          "placeDetails": "Wander through the recreated canals of Venice, complete with gondolas and singing gondoliers.",\n          "placeImageUrl": "https://www.venetianlasvegas.com/content/dam/venetian/master/main/amenities/gondola-rides/gondola-rides-hero-desktop.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1215,\n            "longitude": -115.1737\n          },\n          "ticketPricing": "Free to walk around; Gondola rides cost extra ($39 per person)",\n          "rating": 4.7,\n          "travelTimeFromPrevious": "20-30 minutes by car/taxi/rideshare"\n        },\n        {\n          "placeName": "Dinner at Secret Pizza (Cosmopolitan)",\n          "placeDetails": "Hidden pizza joint at the Cosmopolitan hotel. Known for its delicious and affordable slices.",\n          "placeImageUrl": "https://static.wixstatic.com/media/924aa3_8e4d60f94e1948939789497c27ae180e~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/924aa3_8e4d60f94e1948939789497c27ae180e~mv2.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1119,\n            "longitude": -115.1742\n          },\n          "ticketPricing": "$5-10 per slice",\n          "rating": 4.6,\n          "travelTimeFromPrevious": "10-15 minutes by car/taxi/rideshare"\n        }\n      ]\n    }\n  },\n  "notes": [\n    "Prices are estimates and can vary depending on the season and availability.",\n    "Transportation options include walking, taxis, rideshares (Uber/Lyft), and the Las Vegas Monorail.  Consider purchasing a multi-day Monorail pass if you plan to use it frequently.",\n    "Remember to stay hydrated, especially during the hotter months.",\n    "Take advantage of free activities like the Bellagio fountains and the Conservatory & Botanical Garden.",\n    "Look for happy hour specials and deals on food and drinks to save money.",\n    "Consider purchasing show tickets in advance, especially for popular shows.",\n    "Adjust the itinerary to fit your interests and preferences."\n  ]\n}\n\``,
//       },
//     ],
//   },
// ];

// // Create a chat session
// // export const chatSession: ChatSession = {
// //   history: initialChatHistory,
  
// //   sendMessage: async (message: string) => {
// //     try {
// //       // Start a new chat session with initial configuration and history
// //       const chat = model.startChat({
// //         generationConfig,
// //         history: initialChatHistory,
// //       });

// //       // Send a message to the model
// //       const result = await chat.sendMessage(message);

// //       // Return the response text
// //       return { response: { text: result.response.text() } };
// //     } catch (error) {
// //       console.error("Error sending message to Gemini:", error);
// //       return { response: { text: "Error generating response." } };
// //     }
// //   },
// // };

// export const chatSession: ChatSession = {
//   history: initialChatHistory,
  
//   sendMessage: async (message: string) => {
//     try {
//       const chat = model.startChat({
//         generationConfig,
//         history: initialChatHistory,
//       });

//       const result = await chat.sendMessage(message);
//       return { response: { text: result.response.text() } };
//     } catch (error) {
//       console.error("Error sending message to Gemini:", error);
//       return { response: { text: "Error generating response." } };
//     }
//   },
// };


import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface ChatSession {
  sendMessage: (message: string) => Promise<{ response: { text: string } }>;
  history: ChatMessage[];
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY;

if (!apiKey) {
  console.error("NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY is not set in the environment variables.");
  throw new Error("API key is missing. Please set NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", 
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const initialChatHistory: ChatMessage[] = [
  {
    role: "user",
    parts: [
      {
        text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a moderate budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.If i ask anything other  than travelling then respond with invalid request`,
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: `Okay, here's a comprehensive 3-day Las Vegas travel plan for a couple on a moderate budget, delivered in JSON format.  I've tried to balance iconic Vegas experiences with cost-effective choices.\n\n\`\`\`json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada",\n    "duration": "3 Days",\n    "budget": "Moderate (approx. $600 - $1200 total)",\n    "travelers": "Couple"\n  },\n  "hotelOptions": [\n    {\n      "hotelName": "Linq Hotel + Experience",\n      "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
      "priceRange": "$70 - $150 per night",\n      "hotelImageUrl": "https://www.caesars.com/content/dam/linq/hotel/hotel_hero.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1165,\n        "longitude": -115.1695\n      },\n      "rating": 4.0,\n      "description": "Modern hotel with a central location on the Strip. Features the High Roller observation wheel and a variety of dining and entertainment options.  Good for access to many attractions."\n    },\n    {\n      "hotelName": "Park MGM Las Vegas",\n      "hotelAddress": "3770 S Las Vegas Blvd, Las Vegas, NV 89109",
      "priceRange": "$90 - $200 per night",\n      "hotelImageUrl": "https://www.mgmresorts.com/content/dam/MGM/park-mgm/hotel/park-mgm-hotel-exterior.tif",\n      "geoCoordinates": {\n        "latitude": 36.1028,\n        "longitude": -115.1762\n      },\n      "rating": 4.3,\n      "description": "A stylish and smoke-free hotel on the Strip with a great pool area and easy access to T-Mobile Arena.  Features a good selection of restaurants and bars."\n    },\n    {\n      "hotelName": "Flamingo Las Vegas",\n      "hotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
      "priceRange": "$50 - $120 per night",\n      "hotelImageUrl": "https://www.caesars.com/content/dam/flamingolv/hotel/exterior/flamingo-exterior-16x7.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1171,\n        "longitude": -115.1755\n      },\n      "rating": 3.8,\n      "description": "Iconic hotel with a retro vibe and a central Strip location. Features a wildlife habitat and a variety of affordable dining options. A good choice for budget-conscious travelers."\n    },\n    {\n      "hotelName": "Treasure Island - TI Hotel & Casino",\n      "hotelAddress": "3300 S Las Vegas Blvd, Las Vegas, NV 89109",
      "priceRange": "$80 - $180 per night",\n      "hotelImageUrl": "https://book.treasureisland.com/wp-content/uploads/2023/12/TI-Hotel-Exterior-Day.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1245,\n        "longitude": -115.1755\n      },\n      "rating": 4.1,\n      "description": "Located on the north end of the Strip, Treasure Island offers comfortable rooms, a good selection of restaurants, and a lively casino. Good value for its location."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "Strip Exploration & High Roller Views",\n      "bestTimeToVisit": "Afternoon/Evening",\n      "activities": [\n        {\n          "placeName": "Welcome to Las Vegas Sign",\n          "placeDetails": "Iconic sign for a photo opportunity. Can be crowded, especially during peak hours.",\n          "placeImageUrl": "https://www.lasvegasnevada.gov/files/sharedassets/public/images/lv_sign-137.jpg",\n          "geoCoordinates": {\n            "latitude": 36.0829,\n            "longitude": -115.1734\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "travelTimeFromHotel": "10-20 minutes (depending on hotel location and transportation)"\n        },\n        {\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "Stunning floral displays that change seasonally. Free to enter.",\n          "placeImageUrl": "https://bellagio.mgmresorts.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/bellagio-conservatory-floral-display-interior.tif",\n          "geoCoordinates": {\n            "latitude": 36.1126,\n            "longitude": -115.1761\n          },\n          "ticketPricing": "Free",\n          "rating": 4.8,\n          "travelTimeFromPrevious": "15 minutes walking"\n        },\n        {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "Spectacular water show set to music. Free to watch. Shows every 30 minutes in the afternoon and every 15 minutes in the evening.",\n          "placeImageUrl": "https://bellagio.mgmresorts.com/content/dam/MGM/bellagio/entertainment/fountains-of-bellagio/exterior/bellagio-fountains-night-exterior.tif",\n          "geoCoordinates": {\n            "latitude": 36.1126,\n            "longitude": -115.1761\n          },\n          "ticketPricing": "Free",\n          "rating": 4.9,\n          "travelTimeFromPrevious": "Right next to Conservatory"\n        },\n        {\n          "placeName": "High Roller Observation Wheel",\n          "placeDetails": "Giant Ferris wheel offering panoramic views of the Las Vegas Strip. Consider going at sunset for the best experience.",\n          "placeImageUrl": "https://www.caesars.com/content/dam/linq/things-to-do/high-roller/high-roller-exterior-daytime.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1168,\n            "longitude": -115.1692\n          },\n          "ticketPricing": "$25 - $37 per person (depending on time of day)",\n          "rating": 4.6,\n          "travelTimeFromPrevious": "15-20 minutes walking/taxi from Bellagio"\n        },\n        {\n          "placeName": "Dinner at In-N-Out Burger (for budget-friendly option)",\n          "placeDetails": "Classic California burger chain with a cult following.... A great affordable meal option.",\n          "placeImageUrl": "https://locations.in-n-out.com/Content/img/default/menu.png",\n          "geoCoordinates": {\n            "latitude": 36.1168,\n            "longitude": -115.1692\n          },\n          "ticketPricing": "$10-15",\n          "rating": 4.5,\n          "travelTimeFromPrevious": "next to High Roller"\n        }\n      ]\n    },\n    "day2": {\n      "theme": "Downtown & Fremont Street Experience",\n      "bestTimeToVisit": "Afternoon/Evening",\n      "activities": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A pedestrian mall with a giant video screen canopy and free nightly light shows.",\n          "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2023/07/Fremont-Street-Experience-at-night.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1700,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "Free (for the Fremont Street Experience itself)",\n          "rating": 4.7,\n          "travelTimeFromHotel": "20-30 minutes by car/taxi/rideshare from the Strip"\n        },\n        {\n          "placeName": "SlotZilla Zip Line",\n          "placeDetails": "Zip line attraction that launches you over Fremont Street.",\n          "placeImageUrl": "https://vegasexperience.com/wp-content/uploads/2014/01/slotzilla-photos-01.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1700,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "$39-$59 per person",\n          "rating": 4.3,\n          "travelTimeFromPrevious": "Located on Fremont Street"\n        },\n        {\n          "placeName": "Heart Attack Grill",\n          "placeDetails": "Controversial restaurant with extremely high-calorie burgers and a hospital theme.... A unique and memorable (but potentially unhealthy) experience.",\n          "placeImageUrl": "https://static.onecms.io/wp-content/uploads/sites/9/2018/03/heart-attack-grill-restaurant-las-vegas-FT-BLOG0318.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1700,\n            "longitude": -115.1424\n          },\n          "ticketPricing": "$20-30 per person",\n          "rating": 3.8,\n          "travelTimeFromPrevious": "Located on Fremont Street"\n        },\n        {\n          "placeName": "Mob Museum",\n          "placeDetails": "Museum dedicated to the history of organized crime in America.",\n          "placeImageUrl": "https://themobmuseum.org/wp-content/uploads/2019/05/exterior-2019.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1711,\n            "longitude": -115.1405\n          },\n          "ticketPricing": "$31.95 per person",\n          "rating": 4.6,\n          "travelTimeFromPrevious": "5-10 minutes walking from Fremont Street"\n        },\n        {\n          "placeName": "Dinner at Nacho Daddy (Downtown)",\n          "placeDetails": "Enjoy delicious and creative nachos in downtown Las Vegas. A great value for a filling meal",\n          "placeImageUrl": "https://nachodaddy.com/wp-content/uploads/2021/11/downtown-las-vegas-1-1024x683.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1693,\n            "longitude": -115.1409\n          },\n          "ticketPricing": "$20-30 per person",\n          "rating": 4.4,\n          "travelTimeFromPrevious": "5-10 minutes walking from Mob museum"\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Relaxation & Optional Activities",\n      "bestTimeToVisit": "Morning/Afternoon",\n      "activities": [\n        {\n          "placeName": "Pool Day",\n          "placeDetails": "Relax and enjoy the pool at your hotel.  Most hotels have excellent pool facilities.",\n          "placeImageUrl": "Pool Image will depend on chosen Hotel",\n          "geoCoordinates": "Pool location depends on chosen hotel",\n          "ticketPricing": "Free (with hotel stay)",\n          "rating": 4.0,\n          "travelTimeFromHotel": "On Hotel"\n        },\n        {\n          "placeName": "Ethel M Chocolate Factory & Cactus Garden",\n          "placeDetails": "Free chocolate factory tour and a beautiful cactus garden to explore. Located a short drive from the Strip.",\n          "placeImageUrl": "https://ethelm.com/cdn/shop/files/2021_CactusGarden_WideShot_FINAL_2048x.jpg?v=1679013063",\n          "geoCoordinates": {\n            "latitude": 36.0509,\n            "longitude": -115.0626\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "travelTimeFromPrevious": "20-30 minutes by car/taxi/rideshare from the Strip"\n        },\n         {\n          "placeName": "Seven Magic Mountains",\n          "placeDetails": "Public art installation by Swiss artist Ugo Rondinone, comprised of seven colorful stacked boulder totems.",\n          "placeImageUrl": "https://sevenmagicmountains.com/wp-content/uploads/2016/04/0281_IMG_4031.jpg",\n          "geoCoordinates": {\n            "latitude": 35.9753,\n            "longitude": -115.0833\n          },\n          "ticketPricing": "Free",\n          "rating": 4.3,\n          "travelTimeFromPrevious": "20-30 minutes by car/taxi/rideshare from Ethel M Chocolate Factory & Cactus Garden"\n        },\n        {\n          "placeName": "Explore the Venetian/Palazzo Canals",\n          "placeDetails": "Wander through the recreated canals of Venice, complete with gondolas and singing gondoliers.",\n          "placeImageUrl": "https://www.venetianlasvegas.com/content/dam/venetian/master/main/amenities/gondola-rides/gondola-rides-hero-desktop.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1215,\n            "longitude": -115.1737\n          },\n          "ticketPricing": "Free to walk around; Gondola rides cost extra ($39 per person)",\n          "rating": 4.7,\n          "travelTimeFromPrevious": "20-30 minutes by car/taxi/rideshare"\n        },\n        {\n          "placeName": "Dinner at Secret Pizza (Cosmopolitan)",\n          "placeDetails": "Hidden pizza joint at the Cosmopolitan hotel. Known for its delicious and affordable slices.",\n          "placeImageUrl": "https://static.wixstatic.com/media/924aa3_8e4d60f94e1948939789497c27ae180e~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/924aa3_8e4d60f94e1948939789497c27ae180e~mv2.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1119,\n            "longitude": -115.1742\n          },\n          "ticketPricing": "$5-10 per slice",\n          "rating": 4.6,\n          "travelTimeFromPrevious": "10-15 minutes by car/taxi/rideshare"\n        }\n      ]\n    }\n  },\n  "notes": [\n    "Prices are estimates and can vary depending on the season and availability.",\n    "Transportation options include walking, taxis, rideshares (Uber/Lyft), and the Las Vegas Monorail.  Consider purchasing a multi-day Monorail pass if you plan to use it frequently.",\n    "Remember to stay hydrated, especially during the hotter months.",\n    "Take advantage of free activities like the Bellagio fountains and the Conservatory & Botanical Garden.",\n    "Look for happy hour specials and deals on food and drinks to save money.",\n    "Consider purchasing show tickets in advance, especially for popular shows.",\n    "Adjust the itinerary to fit your interests and preferences."\n  ]\n}\n\``,
      },
    ],
  },
];

export const chatSession: ChatSession = {
  history: initialChatHistory,
  
  sendMessage: async (message: string) => {
    try {
      const chat = model.startChat({
        generationConfig,
        history: initialChatHistory,
      });

      const result = await chat.sendMessage(message);

      if (result && result.response) {
        return { response: { text: result.response.text() } };
      } else {
        console.error("Gemini API returned an empty response.");
        return { response: { text: "Error: Empty response from AI." } };
      }
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      return { response: { text: `Error generating response: ${errorMessage}` } };
    }
  },
};
