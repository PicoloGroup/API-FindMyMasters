/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerifieddd" BOOLEAN NOT NULL DEFAULT false;
