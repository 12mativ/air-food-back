/*
  Warnings:

  - You are about to drop the `CompetenceCharacteristic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompetenceCharacteristic" DROP CONSTRAINT "CompetenceCharacteristic_competenceId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenceCharacteristic" DROP CONSTRAINT "CompetenceCharacteristic_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CompetenceCharacteristic" DROP CONSTRAINT "CompetenceCharacteristic_studentId_fkey";

-- DropTable
DROP TABLE "CompetenceCharacteristic";

-- CreateTable
CREATE TABLE "CompetenceCharacteristicForStudent" (
    "id" TEXT NOT NULL,
    "scaleValue" SMALLINT NOT NULL,
    "competenceId" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "CompetenceCharacteristicForStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetenceCharacteristicForCourse" (
    "id" TEXT NOT NULL,
    "scaleValue" SMALLINT NOT NULL,
    "competenceId" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "CompetenceCharacteristicForCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetenceCharacteristicForStudent_competenceId_key" ON "CompetenceCharacteristicForStudent"("competenceId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetenceCharacteristicForCourse_competenceId_key" ON "CompetenceCharacteristicForCourse"("competenceId");

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristicForStudent" ADD CONSTRAINT "CompetenceCharacteristicForStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristicForStudent" ADD CONSTRAINT "CompetenceCharacteristicForStudent_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristicForCourse" ADD CONSTRAINT "CompetenceCharacteristicForCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristicForCourse" ADD CONSTRAINT "CompetenceCharacteristicForCourse_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
