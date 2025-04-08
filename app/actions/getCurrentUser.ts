import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions); // Getting the session from the server
}

export default async function getCurrentUser() {
  try {
    const session = await getSession(); // Getting the session from the server into a variable

    // Check if session or required session properties are missing
    if (!session || !session.user || !session.user.email) {
      return null; // No session or invalid session
    }

    // Find the user in the database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string, // Assuming email exists and is a string
      },
    });

    // If the user doesn't exist, return null
    if (!currentUser) {
      return null;
    }

    // Format dates and return the current user
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.error("Error fetching current user:", error.message);
    return null; // Handle errors gracefully
  }
}