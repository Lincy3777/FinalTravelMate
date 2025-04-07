
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_AI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("Gemini API Key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
    throw new Error("Gemini API Key is missing");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
});

// Function to generate travel recommendations based on user input
const generateTravelRecommendations = async (message: string) => {
    try {
        const result = await model.generateContent(message);
        if (result && result.response) {
            return result.response.text();
        } else {
            console.error("Gemini API response is invalid:", result);
            return "Failed to retrieve response from Gemini API";
        }
    } catch (error) {
        console.error('Error:', error);
        return "Error: Could not get response.";
    }
};

// Function to check if a message is travel-related
function isTravelRelated(message: string): boolean {
    const travelKeywords = [
        "hi", "hello", "travel", "trip", "vacation", "destination", "beach", "city", "national park", "international", "foreign", "places", "tourism",
        "abroad", "overseas", "local", "domestic", "staycation", "weekend", "getaway", "escape", "retreat", "adventure", "explore", "discover", "holiday",
        "experience", "visit", "tour", "holiday", "place", "location", "journey", "sightseeing", "go", "fly", "drive", "cruise", "plan", "pack","explore",
        "book", "hotel", "resort", "museum", "restaurant", "attraction", "activity", "culture", "nature", "outdoor", "indoor", "relax", "hike", "route",
        "camp", "swim", "ski", "surf", "sail", "dive", "eat", "drink", "party", "shop", "souvenir", "photo", "memory", "fun", "exciting", "map", "guide",
        "relaxing", "beautiful", "amazing", "great", "best", "top", "popular", "famous", "trendy", "luxury", "budget", "cheap", "expensive", "currency",
        "affordable", "all-inclusive", "family-friendly", "kid-friendly", "pet-friendly", "eco-friendly", "sustainable", "green", "safe", "clean","plan",
        "friendly", "warm", "sunny", "tropical", "exotic", "romantic", "historic", "cultural", "artistic", "modern", "traditional", "authentic", "local",
        "local", "off-the-beaten-path", "hidden gem", "must-see", "must-do", "must-visit", "bucket list", "dream", "paradise", "heaven", "oasis", "sanctuary",
        "expedition", "voyage", "quest", "pilgrimage", "safari", "road trip", "backpacking", "learning", "unwinding", "recharging", 
        "refreshing", "rejuvenating", "inspiring", "motivating", "thrilling", "challenging", "rewarding", "memorable", "unforgettable", 
        "life-changing", "transformative", "enriching", "fulfilling", "satisfying", "enjoyable", "pleasant", "comfortable", "luxurious", 
        "cozy", "peaceful", "serene", "tranquil", "quiet", "lively", "vibrant", "dynamic", "energetic", "active", "healthy", "wellness",
        "well-being", "fitness", "yoga", "meditation", "spa", "massage", "treatment", "therapy", "healing", "recovery", "rehabilitation",
        "detox", "nutrition", "diet", "exercise", "sport", "leisure", "recreation", "entertainment", "art", "music", "theater", "dance",
        "festival", "event", "celebration", "nightlife", "shopping", "dining", "cuisine", "food", "drink", "wine", "beer", "cocktail",
        "coffee", "tea", "dessert", "regional", "international","to","from", "near", "far", "close", "around", "about", "with","want",
        "for", "to", "from", "between", "among", "through", "across", "along", "past", "over", "under", "above", "below", "inside","tourist",
        "traveler", "explorer", "adventurer", "wanderer", "nomad", "globetrotter", "journeyer", "expeditionist", "voyager", "pilgrim","toursim","cloth","package"
    ];

    // Check if at least one keyword is present
    return travelKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        console.log('Received message:', message); 

        // Check if the message is travel-related
        if (!isTravelRelated(message)) {
            console.log('Message is not travel-related.'); 
            return NextResponse.json({
                response: "I'm a travel assistant. Please ask me about travel destinations or plans.",
            });
        }

        // Initial response to prompt user for travel preferences
        if (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello")) {
            return NextResponse.json({
                response: "Planning a trip? Consider beach getaways, city breaks, national parks, or international destinations. What type of vacation are you interested in?",
            });
        }

        // Handle specific travel queries
        if (message.toLowerCase().includes("beach")) {
            return NextResponse.json({
                response: "For a beach vacation, are you looking for relaxation, adventure, or a family-friendly spot?",
            });
        } else if (message.toLowerCase().includes("city")) {
            return NextResponse.json({
                response: "For a city break, are you interested in cultural experiences, food and nightlife, or outdoor activities?",
            });
        } else if (message.toLowerCase().includes("national parks")) {
            return NextResponse.json({
                response: "For national parks, are you interested in hiking, camping, or scenic drives?",
            });
        } else if (message.toLowerCase().includes("international")) {
            return NextResponse.json({
                response: "For international destinations, are you looking for cultural immersion, historical sites, or a mix of city and nature?",
            });
        }

        // Generate travel recommendations based on user input
        const recommendation = await generateTravelRecommendations(message);
        const formattedResponse = recommendation.replace(/\*\*(.*?)\*\*/g, '**$1**\n');
        return NextResponse.json({ response: formattedResponse });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error: Could not get response.' }, { status: 500 });
    }
}
