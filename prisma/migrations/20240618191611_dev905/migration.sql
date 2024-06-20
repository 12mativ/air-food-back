/*
  Warnings:

  - A unique constraint covering the columns `[day,time]` on the table `Times` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Times_day_time_key" ON "Times"("day", "time");
