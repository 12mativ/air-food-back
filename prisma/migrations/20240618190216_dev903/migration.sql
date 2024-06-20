/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DailySchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DailySchedule_userId_key" ON "DailySchedule"("userId");
