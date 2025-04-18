import prisma from "@/app/libs/prismadb"; 
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorite = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),//toString() converts date to human readable format
    }));

    return safeFavorite;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred while fetching favorite listings.");
    }
  }
}