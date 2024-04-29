-- DropIndex
DROP INDEX "Pilot_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Competence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImprovingCompetence" (
    "id" TEXT NOT NULL,
    "improvingValue" SMALLINT NOT NULL DEFAULT 0,
    "competenceId" TEXT NOT NULL,

    CONSTRAINT "ImprovingCompetence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetenceCharacteristic" (
    "scaleValue" SMALLINT NOT NULL,
    "competenceId" TEXT NOT NULL,
    "courseId" TEXT
);

-- CreateTable
CREATE TABLE "CompetenciesOnCourses" (
    "courseId" TEXT NOT NULL,
    "competenceId" TEXT NOT NULL,

    CONSTRAINT "CompetenciesOnCourses_pkey" PRIMARY KEY ("courseId","competenceId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "surname" TEXT,
    "lastName" TEXT,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachesOnEvents" (
    "coachId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "CoachesOnEvents_pkey" PRIMARY KEY ("coachId","eventId")
);

-- CreateTable
CREATE TABLE "Simulator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Simulator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachesOnSimulators" (
    "coachId" TEXT NOT NULL,
    "simulatorId" TEXT NOT NULL,

    CONSTRAINT "CoachesOnSimulators_pkey" PRIMARY KEY ("coachId","simulatorId")
);

-- CreateTable
CREATE TABLE "SimulatorsOnEvents" (
    "simulatorId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "SimulatorsOnEvents_pkey" PRIMARY KEY ("simulatorId","eventId")
);

-- CreateTable
CREATE TABLE "_EventPrerequisiteEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ImprovingCompetence_competenceId_key" ON "ImprovingCompetence"("competenceId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetenceCharacteristic_competenceId_key" ON "CompetenceCharacteristic"("competenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_courseId_key" ON "Event"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventPrerequisiteEvents_AB_unique" ON "_EventPrerequisiteEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_EventPrerequisiteEvents_B_index" ON "_EventPrerequisiteEvents"("B");

-- AddForeignKey
ALTER TABLE "ImprovingCompetence" ADD CONSTRAINT "ImprovingCompetence_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristic" ADD CONSTRAINT "CompetenceCharacteristic_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenceCharacteristic" ADD CONSTRAINT "CompetenceCharacteristic_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciesOnCourses" ADD CONSTRAINT "CompetenciesOnCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciesOnCourses" ADD CONSTRAINT "CompetenciesOnCourses_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "ImprovingCompetence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesOnEvents" ADD CONSTRAINT "CoachesOnEvents_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesOnEvents" ADD CONSTRAINT "CoachesOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesOnSimulators" ADD CONSTRAINT "CoachesOnSimulators_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesOnSimulators" ADD CONSTRAINT "CoachesOnSimulators_simulatorId_fkey" FOREIGN KEY ("simulatorId") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulatorsOnEvents" ADD CONSTRAINT "SimulatorsOnEvents_simulatorId_fkey" FOREIGN KEY ("simulatorId") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulatorsOnEvents" ADD CONSTRAINT "SimulatorsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPrerequisiteEvents" ADD CONSTRAINT "_EventPrerequisiteEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventPrerequisiteEvents" ADD CONSTRAINT "_EventPrerequisiteEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
