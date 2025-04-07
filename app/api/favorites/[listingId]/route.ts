import { NextResponse, NextRequest } from "next/server"; // Import NextRequest
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

    const listing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/listings/[listingId] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}