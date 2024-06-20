/*
  Warnings:

  - You are about to drop the column `userId` on the `Schedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[scheduleId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scheduleId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_userId_fkey";

-- DropIndex
DROP INDEX "Schedule_userId_key";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_scheduleId_key" ON "Student"("scheduleId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
