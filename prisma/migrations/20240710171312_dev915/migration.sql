-- CreateTable
CREATE TABLE "StudentExpectingCompetence" (
    "id" TEXT NOT NULL,
    "scaleValue" SMALLINT NOT NULL,
    "competenceId" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "StudentExpectingCompetence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentExpectingCompetence" ADD CONSTRAINT "StudentExpectingCompetence_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExpectingCompetence" ADD CONSTRAINT "StudentExpectingCompetence_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
