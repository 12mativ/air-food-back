/*
  Warnings:

  - You are about to drop the `_EventPrerequisiteEvents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Simulator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventPrerequisiteEvents" DROP CONSTRAINT "_EventPrerequisiteEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventPrerequisiteEvents" DROP CONSTRAINT "_EventPrerequisiteEvents_B_fkey";

-- AlterTable
ALTER TABLE "Simulator" ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_EventPrerequisiteEvents";

-- AddForeignKey
ALTER TABLE "Simulator" ADD CONSTRAINT "Simulator_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
