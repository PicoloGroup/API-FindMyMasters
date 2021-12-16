/*
  Warnings:

  - The `duration` column on the `master-program` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tution_amount` column on the `master-program` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "master-program" DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER,
DROP COLUMN "tution_amount",
ADD COLUMN     "tution_amount" DOUBLE PRECISION;
