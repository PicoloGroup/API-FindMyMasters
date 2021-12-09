-- CreateTable
CREATE TABLE "master-program-recommendation" (
    "id" SERIAL NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "liked_date" DATE NOT NULL,

    CONSTRAINT "master-program-recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "master-program-recommendation" ADD CONSTRAINT "master-program-recommendation_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-recommendation" ADD CONSTRAINT "master-program-recommendation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
