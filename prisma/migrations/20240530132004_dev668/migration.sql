/*
  Warnings:

  - You are about to drop the `_CourseToImprovingCompetence` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `ImprovingCompetence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CourseToImprovingCompetence" DROP CONSTRAINT "_CourseToImprovingCompetence_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToImprovingCompetence" DROP CONSTRAINT "_CourseToImprovingCompetence_B_fkey";

-- AlterTable
ALTER TABLE "ImprovingCompetence" ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CourseToImprovingCompetence";

-- AddForeignKey
ALTER TABLE "ImprovingCompetence" ADD CONSTRAINT "ImprovingCompetence_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
