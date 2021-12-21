-- AlterTable
ALTER TABLE "master-program-comment" ALTER COLUMN "liked_date" SET DEFAULT timezone('UTC'::text, now()),
ALTER COLUMN "liked_date" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "master-program-like" ALTER COLUMN "liked_date" SET DEFAULT timezone('UTC'::text, now()),
ALTER COLUMN "liked_date" SET DATA TYPE TIMESTAMP(6);
