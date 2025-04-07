import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Define the interface for params
interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  context: { params: IParams }
) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract listingId from params
    const { listingId } = context.params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Add listingId to favoriteIds
    const favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    // Update the user in the database
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("POST /api/favorites/[listingId] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: IParams }
) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract listingId from params
    const { listingId } = context.params;

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Remove listingId from favoriteIds
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    // Update the user in the database
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("DELETE /api/favorites/[listingId] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}