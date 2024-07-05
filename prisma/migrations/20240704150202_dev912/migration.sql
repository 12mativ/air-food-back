/*
  Warnings:

  - A unique constraint covering the columns `[scheduleId,day]` on the table `Times` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Times_scheduleId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Times_scheduleId_day_key" ON "Times"("scheduleId", "day");
