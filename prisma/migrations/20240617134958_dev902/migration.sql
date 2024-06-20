/*
  Warnings:

  - You are about to drop the column `day` on the `DailySchedule` table. All the data in the column will be lost.
  - You are about to drop the column `free` on the `Times` table. All the data in the column will be lost.
  - The `time` column on the `Times` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[dailyScheduleId,day]` on the table `Times` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `Times` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DailySchedule_userId_day_key";

-- DropIndex
DROP INDEX "Times_dailyScheduleId_time_key";

-- AlterTable
ALTER TABLE "DailySchedule" DROP COLUMN "day";

-- AlterTable
ALTER TABLE "Times" DROP COLUMN "free",
ADD COLUMN     "day" TEXT NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" DECIMAL(65,30)[];

-- CreateIndex
CREATE UNIQUE INDEX "Times_dailyScheduleId_day_key" ON "Times"("dailyScheduleId", "day");
