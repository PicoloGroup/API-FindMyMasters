/*
  Warnings:

  - The values [UNIVERSITY] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `email` on the `university` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `university` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `university` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Field" AS ENUM ('TECHNOLOGY', 'ENGINEERING', 'MANAGEMENT', 'SOCIAL', 'BUSINESS', 'ECONOMIC', 'HUMANITIES', 'EDUCATION', 'NATURAL', 'HEALTHCARE', 'JOURNALISMANDMASSCOMMUNICATION', 'ADMINISTRATION', 'LIFE', 'MARKETING', 'DESIGN', 'ART', 'LAW', 'ENVIRONMENT', 'ARCHITECTURE', 'SUSTAINABILITY', 'ENERGY', 'PERFORMINGARTS', 'TOURISMANDHOSTITALITY', 'SPORT', 'FASHION', 'LANGUAGES', 'CONSTRUCTION', 'PROFESSIONAL', 'FOODANDBEVERAGE', 'GENERAL', 'AVIATION', 'SELFIMPROVEMENT', 'LIFESKILLS', 'COSMETOLOGY');

-- CreateEnum
CREATE TYPE "Schedule" AS ENUM ('FULLTIME', 'PARTTIME');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('ONLINE', 'CAMPUS');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('STUDENT', 'UNIVERSITYADMIN');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "university" DROP CONSTRAINT "university_userId_fkey";

-- DropIndex
DROP INDEX "university_email_key";

-- DropIndex
DROP INDEX "university_userId_key";

-- AlterTable
ALTER TABLE "university" DROP COLUMN "email",
DROP COLUMN "userId",
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "rank" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "university-admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "userId" INTEGER NOT NULL,
    "universityId" INTEGER NOT NULL,

    CONSTRAINT "university-admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "quality_of_life_index" TEXT,
    "purchasing_power_index" TEXT,
    "safety_index" TEXT,
    "health_care_index" TEXT,
    "cost_of_living_index" TEXT,
    "property_price_to_income_ratio" TEXT,
    "traffic_commute_time_index" TEXT,
    "pollution_index" TEXT,
    "climate_index" TEXT,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master-program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT,
    "language" TEXT,
    "mode" "Mode",
    "schedule" "Schedule",
    "deadline" DATE,
    "field" "Field",
    "url" TEXT,
    "tution_amount" TEXT,
    "tution_currency" TEXT,
    "universityId" INTEGER NOT NULL,

    CONSTRAINT "master-program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master-program-like" (
    "id" SERIAL NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "liked_date" DATE NOT NULL,

    CONSTRAINT "master-program-like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master-program-comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "liked_date" DATE NOT NULL,

    CONSTRAINT "master-program-comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quick-application" (
    "id" SERIAL NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "universityId" INTEGER NOT NULL,

    CONSTRAINT "quick-application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "university-admin_username_key" ON "university-admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "university-admin_userId_key" ON "university-admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "university-admin_universityId_key" ON "university-admin"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "university-admin" ADD CONSTRAINT "university-admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university-admin" ADD CONSTRAINT "university-admin_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program" ADD CONSTRAINT "master-program_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-like" ADD CONSTRAINT "master-program-like_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-like" ADD CONSTRAINT "master-program-like_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-comment" ADD CONSTRAINT "master-program-comment_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-comment" ADD CONSTRAINT "master-program-comment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick-application" ADD CONSTRAINT "quick-application_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick-application" ADD CONSTRAINT "quick-application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick-application" ADD CONSTRAINT "quick-application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
