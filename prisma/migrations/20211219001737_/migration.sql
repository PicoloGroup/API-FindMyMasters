/*
  Warnings:

  - Made the column `registrationDate` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "registrationDate" SET NOT NULL,
ALTER COLUMN "registrationDate" SET DATA TYPE TIMESTAMP(6);
