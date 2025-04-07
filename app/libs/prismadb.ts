

import { PrismaClient } from "@prisma/client";

// Extend the global object type to include `prisma`
declare global {
  // This tells TypeScript that `globalThis` can have a `prisma` property
  var prisma: PrismaClient | undefined;
}

// Use the global instance or create a new one
const client = globalThis.prisma || new PrismaClient();

// In dev, store the Prisma client on globalThis to avoid multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
