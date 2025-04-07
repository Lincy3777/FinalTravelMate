/*
  Warnings:

  - Added the required column `budget` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `days` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `activities` on the `Itinerary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "budget" INTEGER NOT NULL,
ADD COLUMN     "days" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "people" INTEGER NOT NULL,
ADD COLUMN     "places" TEXT[],
ADD COLUMN     "preferences" TEXT,
ADD COLUMN     "restaurants" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "activities",
ADD COLUMN     "activities" JSONB NOT NULL;
