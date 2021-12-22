-- DropForeignKey
ALTER TABLE "master-program" DROP CONSTRAINT "master-program_universityId_fkey";

-- AlterTable
ALTER TABLE "master-program" ALTER COLUMN "universityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "master-program" ADD CONSTRAINT "master-program_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE SET NULL ON UPDATE CASCADE;
