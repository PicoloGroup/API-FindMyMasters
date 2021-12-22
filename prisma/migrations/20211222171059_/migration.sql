/*
  Warnings:

  - You are about to drop the column `liked_date` on the `master-program-recommendation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "master-program-recommendation" DROP COLUMN "liked_date",
ADD COLUMN     "recommendation_date" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now());
