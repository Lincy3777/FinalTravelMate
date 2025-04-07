import { NextResponse, NextRequest } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Define your IParams interface (if you haven't already)
interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: NextRequest, // Use NextRequest for the request object
  { params }: { params: IParams } // Destructure params from the second argument
): Promise<NextResponse> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId } = params; // Access listingId from the destructured params

    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const favoriteIds = (currentUser.favoriteIds || []).filter(
      (id: string) => id !== listingId
    );

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/favorites/[listingId] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}