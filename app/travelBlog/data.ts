export type BlogPost = {
    title: string;
    summary: string;
    slug: string;
    image: string;
    content: string;
  };
  
  export function getBlogPosts(): BlogPost[] {
    return [
      {
        title: "Bali – Paradise of Culture & Beaches",
        slug: "bali",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        summary:
          "Bali blends mystical temples, surf-friendly beaches, and vibrant local traditions — perfect for both soul-searchers and adventurers.",
        content: "Full content for Bali goes here...",
      },
      {
        title: "Swiss Alps – A Winter Wonderland",
        slug: "swiss-alps",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
        summary:
          "The Swiss Alps captivate with snow-covered peaks, scenic train rides, and cozy alpine villages. A dream for skiers and nature lovers.",
        content: "Full content for Swiss Alps goes here...",
      },
      {
        title: "Kyoto – Where History Breathes",
        slug: "kyoto",
        image: "https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&w=800&q=80",
        summary:
          "Kyoto stuns with ancient temples, cherry blossoms, and traditional tea houses. A peaceful gateway into Japan’s past.",
        content: "Full content for Kyoto goes here...",
      },
    ];
  }
  