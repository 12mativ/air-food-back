-- DropForeignKey
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_userId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "CourseCompetenceCharacteristic" DROP CONSTRAINT "CourseCompetenceCharacteristic_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "CourseCompetenceCharacteristic" DROP CONSTRAINT "CourseCompetenceCharacteristic_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ImprovingCompetence" DROP CONSTRAINT "ImprovingCompetence_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCompetenceCharacteristic" DROP CONSTRAINT "StudentCompetenceCharacteristic_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCompetenceCharacteristic" DROP CONSTRAINT "StudentCompetenceCharacteristic_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImprovingCompetence" ADD CONSTRAINT "ImprovingCompetence_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompetenceCharacteristic" ADD CONSTRAINT "StudentCompetenceCharacteristic_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompetenceCharacteristic" ADD CONSTRAINT "StudentCompetenceCharacteristic_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCompetenceCharacteristic" ADD CONSTRAINT "CourseCompetenceCharacteristic_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCompetenceCharacteristic" ADD CONSTRAINT "CourseCompetenceCharacteristic_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
