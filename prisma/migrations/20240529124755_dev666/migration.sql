/*
  Warnings:

  - You are about to drop the `CompetenceCharacteristicForCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompetenceCharacteristicForStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompetenceCharacteristicForCourse" DROP CONSTRAINT "CompetenceCharacteristicForCourse_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenceCharacteristicForCourse" DROP CONSTRAINT "CompetenceCharacteristicForCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenceCharacteristicForStudent" DROP CONSTRAINT "CompetenceCharacteristicForStudent_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenceCharacteristicForStudent" DROP CONSTRAINT "CompetenceCharacteristicForStudent_studentId_fkey";

-- DropTable
DROP TABLE "CompetenceCharacteristicForCourse";

-- DropTable
DROP TABLE "CompetenceCharacteristicForStudent";

-- CreateTable
CREATE TABLE "StudentCompetenceCharacteristic" (
    "id" TEXT NOT NULL,
    "scaleValue" SMALLINT NOT NULL,
    "competenceId" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "StudentCompetenceCharacteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCompetenceCharacteristic" (
    "id" TEXT NOT NULL,
    "scaleValue" SMALLINT NOT NULL,
    "competenceId" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "CourseCompetenceCharacteristic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentCompetenceCharacteristic_competenceId_key" ON "StudentCompetenceCharacteristic"("competenceId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCompetenceCharacteristic_competenceId_key" ON "CourseCompetenceCharacteristic"("competenceId");

-- AddForeignKey
ALTER TABLE "StudentCompetenceCharacteristic" ADD CONSTRAINT "StudentCompetenceCharacteristic_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCompetenceCharacteristic" ADD CONSTRAINT "StudentCompetenceCharacteristic_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCompetenceCharacteristic" ADD CONSTRAINT "CourseCompetenceCharacteristic_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCompetenceCharacteristic" ADD CONSTRAINT "CourseCompetenceCharacteristic_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
