/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `university` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `university` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "university" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "university_email_key" ON "university"("email");
