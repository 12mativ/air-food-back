/*
  Warnings:

  - You are about to drop the column `time` on the `Times` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Times_day_time_key";

-- AlterTable
ALTER TABLE "Times" DROP COLUMN "time";

-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL,
    "startTime" DOUBLE PRECISION NOT NULL,
    "endTime" DOUBLE PRECISION NOT NULL,
    "timesId" TEXT NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_timesId_fkey" FOREIGN KEY ("timesId") REFERENCES "Times"("id") ON DELETE CASCADE ON UPDATE CASCADE;
