/*
  Warnings:

  - You are about to drop the column `dailyScheduleId` on the `Times` table. All the data in the column will be lost.
  - You are about to drop the `DailySchedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[scheduleId]` on the table `Times` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scheduleId,day]` on the table `Times` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scheduleId` to the `Times` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailySchedule" DROP CONSTRAINT "DailySchedule_userId_fkey";

-- DropForeignKey
ALTER TABLE "Times" DROP CONSTRAINT "Times_dailyScheduleId_fkey";

-- DropIndex
DROP INDEX "Times_dailyScheduleId_day_key";

-- DropIndex
DROP INDEX "Times_dailyScheduleId_key";

-- AlterTable
ALTER TABLE "Times" DROP COLUMN "dailyScheduleId",
ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "DailySchedule";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_userId_key" ON "Schedule"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Times_scheduleId_key" ON "Times"("scheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Times_scheduleId_day_key" ON "Times"("scheduleId", "day");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Times" ADD CONSTRAINT "Times_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
