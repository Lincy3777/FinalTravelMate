// File: pages/api/auth/[...nextauth].ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import NextAuth from "next-auth";

// Define a custom User interface to match NextAuth's User type
interface NextAuthUser {
  id: string;
  name: string | null | undefined; // Match the extended User type
  email: string;
  emailVerified: Date | null;
  image: string | null | undefined;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        // Retrieve the user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Ensure the user exists and has a hashed password
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Compare the provided password with the hashed password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If the password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Return the user object in a format compatible with NextAuth's User type
        const safeUser: NextAuthUser = {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? "",
          emailVerified: user.emailVerified,
          image: user.image ?? null,
        };

        return safeUser;
      },
    }),
  ],
  callbacks: {
    // JWT callback to include user ID and name in the token
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id as string, // Explicitly type `id` as `string`
          username: user.name as string | null | undefined, // Explicitly type `name`
        };
      }
      return token;
    },
    // Session callback to include user ID and name in the session
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string, // Explicitly type `id` as `string`
          name: token.username as string | null | undefined, // Explicitly type `name`
        },
      };
    },
  },
  pages: {
    signIn: "/", // Redirect to the homepage for login
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing tokens
};

export default NextAuth(authOptions);