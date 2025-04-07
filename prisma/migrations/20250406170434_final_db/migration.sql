/*
  Warnings:

  - You are about to drop the `FinancialTracker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itinerary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LanguageAssistant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FinancialTracker" DROP CONSTRAINT "FinancialTracker_userId_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_userId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageAssistant" DROP CONSTRAINT "LanguageAssistant_userId_fkey";

-- DropTable
DROP TABLE "FinancialTracker";

-- DropTable
DROP TABLE "Itinerary";

-- DropTable
DROP TABLE "LanguageAssistant";
