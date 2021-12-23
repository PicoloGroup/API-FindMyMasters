-- CreateEnum
CREATE TYPE "Field" AS ENUM ('ADMINISTRATION', 'ARCHITECTURE', 'ART', 'AVIATION', 'BUSINESS', 'CONSTRUCTION', 'COSMETOLOGY', 'DESIGN', 'ECONOMIC', 'EDUCATION', 'ENERGY', 'ENGINEERING', 'ENVIRONMENTAL', 'FASHION', 'FOOD_AND_BEVERAGE', 'GENERAL', 'HEALTHCARE', 'HUMANITIES', 'JOURNALISM_AND_MASSCOMMUNICATION', 'LANGUAGES', 'LAW', 'LIFE', 'LIFESKILLS', 'MANAGEMENT', 'MARKETING', 'NATURAL', 'PERFORMINGARTS', 'PROFESSIONAL', 'SELFIMPROVEMENT', 'SOCIAL', 'SPORT', 'SUSTAINABILITY', 'TECHNOLOGY', 'TOURISM_AND_HOSPITALITY');

-- CreateEnum
CREATE TYPE "Schedule" AS ENUM ('FULLTIME', 'PARTTIME');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('ONLINE', 'CAMPUS', 'COMBINED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'UNIVERSITYADMIN');

-- CreateTable
CREATE TABLE "email-change" (
    "token" CHAR(21) NOT NULL,
    "newEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "email-change_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "email-verification" (
    "token" CHAR(21) NOT NULL,
    "userId" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "email-verification_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "password-reset" (
    "token" CHAR(21) NOT NULL,
    "userId" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "password-reset_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "passwordHash" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "registrationDate" TIMESTAMP(6) DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "image" TEXT,
    "birthDate" DATE,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "university" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "rank" TEXT,
    "cityId" INTEGER,

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
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
    "name" TEXT,
    "duration" INTEGER,
    "language" TEXT,
    "mode" "Mode",
    "schedule" "Schedule",
    "deadline" DATE,
    "field" "Field",
    "url" TEXT,
    "tution_amount" DOUBLE PRECISION,
    "tution_currency" TEXT,
    "universityId" INTEGER,

    CONSTRAINT "master-program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master-program-like" (
    "id" SERIAL NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "liked_date" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "master-program-like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master-program-comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "liked_date" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "master-program-comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master-program-recommendation" (
    "id" SERIAL NOT NULL,
    "masterProgramId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "recommendation_date" TIMESTAMP(6) NOT NULL DEFAULT timezone('UTC'::text, now()),

    CONSTRAINT "master-program-recommendation_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "email-change_userId_key" ON "email-change"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "email-verification_userId_key" ON "email-verification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "password-reset_userId_key" ON "password-reset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_userId_key" ON "student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "university-admin_username_key" ON "university-admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "university-admin_userId_key" ON "university-admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "university-admin_universityId_key" ON "university-admin"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "university_name_key" ON "university"("name");

-- CreateIndex
CREATE UNIQUE INDEX "university_cityId_key" ON "university"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "master-program_universityId_key" ON "master-program"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "master-program-like_studentId_key" ON "master-program-like"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "master-program-comment_masterProgramId_key" ON "master-program-comment"("masterProgramId");

-- CreateIndex
CREATE UNIQUE INDEX "master-program-comment_studentId_key" ON "master-program-comment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "master-program-recommendation_masterProgramId_key" ON "master-program-recommendation"("masterProgramId");

-- CreateIndex
CREATE UNIQUE INDEX "master-program-recommendation_studentId_key" ON "master-program-recommendation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "quick-application_masterProgramId_key" ON "quick-application"("masterProgramId");

-- CreateIndex
CREATE UNIQUE INDEX "quick-application_studentId_key" ON "quick-application"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "quick-application_universityId_key" ON "quick-application"("universityId");

-- AddForeignKey
ALTER TABLE "email-change" ADD CONSTRAINT "email-change_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email-verification" ADD CONSTRAINT "email-verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password-reset" ADD CONSTRAINT "password-reset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university-admin" ADD CONSTRAINT "university-admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university-admin" ADD CONSTRAINT "university-admin_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university" ADD CONSTRAINT "university_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program" ADD CONSTRAINT "master-program_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-like" ADD CONSTRAINT "master-program-like_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-like" ADD CONSTRAINT "master-program-like_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-comment" ADD CONSTRAINT "master-program-comment_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-comment" ADD CONSTRAINT "master-program-comment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-recommendation" ADD CONSTRAINT "master-program-recommendation_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master-program-recommendation" ADD CONSTRAINT "master-program-recommendation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick-application" ADD CONSTRAINT "quick-application_masterProgramId_fkey" FOREIGN KEY ("masterProgramId") REFERENCES "master-program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick-application" ADD CONSTRAINT "quick-application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick-application" ADD CONSTRAINT "quick-application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
