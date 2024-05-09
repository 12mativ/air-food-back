/*
  Warnings:

  - You are about to drop the `CompetenciesOnCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompetenciesOnCourses" DROP CONSTRAINT "CompetenciesOnCourses_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenciesOnCourses" DROP CONSTRAINT "CompetenciesOnCourses_courseId_fkey";

-- AlterTable
ALTER TABLE "CompetenceCharacteristic" ADD COLUMN     "studentId" TEXT;

-- DropTable
DROP TABLE "CompetenciesOnCourses";

-- CreateTable
CREATE TABLE "_CourseToImprovingCompetence" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToImprovingCompetence_AB_unique" ON "_CourseToImprovingCompetence"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToImprovingCompetence_B_index" ON "_CourseToImprovingCompetence"("B");

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristic" ADD CONSTRAINT "CompetenceCharacteristic_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToImprovingCompetence" ADD CONSTRAINT "_CourseToImprovingCompetence_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToImprovingCompetence" ADD CONSTRAINT "_CourseToImprovingCompetence_B_fkey" FOREIGN KEY ("B") REFERENCES "ImprovingCompetence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
