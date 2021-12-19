-- AlterTable
ALTER TABLE "user" ALTER COLUMN "registrationDate" DROP NOT NULL,
ALTER COLUMN "registrationDate" SET DATA TYPE TIMESTAMP(3);
