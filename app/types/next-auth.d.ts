// // Removed: import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name: string | null;
//       image: string | null;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//     name: string | null;
//     image: string | null;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     email: string;
//     name: string | null;
//   }
// }

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` field
      name: string | null | undefined; // Match the expected type
      email: string;
      image: string | null | undefined;
    };
    expires: string; // Ensure this matches the default session type
  }

  interface User {
    id: string;
    name: string | null | undefined;
    email: string;
    image: string | null | undefined;
  }
}