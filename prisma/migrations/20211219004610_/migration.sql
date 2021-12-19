-- DropForeignKey
ALTER TABLE "university" DROP CONSTRAINT "university_cityId_fkey";

-- AlterTable
ALTER TABLE "university" ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;
