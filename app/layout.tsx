// A default server component
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SearchModal from "./components/modals/SearchModal";
import Chatbot from "./components/chatbot/chatbot";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Travel Mate",
  description: "Created by Lincy",
};

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession(authOptions);
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not defined in the environment.');
  }

  return (
    <html lang="en">
      <body className = {font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <GoogleOAuthProvider clientId={clientId}>
            <RentModal />
            <LoginModal/>
            <RegisterModal />
            <Navbar session={session} />
          </GoogleOAuthProvider>
        </ClientOnly>
        <div className="pb-2 pt-28">
          {children}
          <Chatbot />
        </div>    
        <Footer />
      </body>
    </html>
  );
}
