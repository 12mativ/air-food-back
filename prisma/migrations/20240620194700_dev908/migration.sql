/*
  Warnings:

  - Changed the type of `day` on the `Times` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- AlterTable
ALTER TABLE "Times" DROP COLUMN "day",
ADD COLUMN     "day" "Days" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Times_scheduleId_day_key" ON "Times"("scheduleId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Times_day_time_key" ON "Times"("day", "time");
