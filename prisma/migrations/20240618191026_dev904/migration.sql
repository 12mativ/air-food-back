/*
  Warnings:

  - A unique constraint covering the columns `[dailyScheduleId]` on the table `Times` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Times_dailyScheduleId_key" ON "Times"("dailyScheduleId");
