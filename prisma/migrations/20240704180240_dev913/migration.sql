/*
  Warnings:

  - A unique constraint covering the columns `[competenceId,courseId]` on the table `ImprovingCompetence` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImprovingCompetence_competenceId_courseId_key" ON "ImprovingCompetence"("competenceId", "courseId");
