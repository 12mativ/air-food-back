/*
  Warnings:

  - You are about to drop the `CoachesOnEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachesOnSimulators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SimulatorsOnEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoachesOnEvents" DROP CONSTRAINT "CoachesOnEvents_coachId_fkey";

-- DropForeignKey
ALTER TABLE "CoachesOnEvents" DROP CONSTRAINT "CoachesOnEvents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "CoachesOnSimulators" DROP CONSTRAINT "CoachesOnSimulators_coachId_fkey";

-- DropForeignKey
ALTER TABLE "CoachesOnSimulators" DROP CONSTRAINT "CoachesOnSimulators_simulatorId_fkey";

-- DropForeignKey
ALTER TABLE "SimulatorsOnEvents" DROP CONSTRAINT "SimulatorsOnEvents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "SimulatorsOnEvents" DROP CONSTRAINT "SimulatorsOnEvents_simulatorId_fkey";

-- DropTable
DROP TABLE "CoachesOnEvents";

-- DropTable
DROP TABLE "CoachesOnSimulators";

-- DropTable
DROP TABLE "SimulatorsOnEvents";

-- CreateTable
CREATE TABLE "_EventToSimulator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CoachToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CoachToSimulator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSimulator_AB_unique" ON "_EventToSimulator"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSimulator_B_index" ON "_EventToSimulator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoachToEvent_AB_unique" ON "_CoachToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CoachToEvent_B_index" ON "_CoachToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoachToSimulator_AB_unique" ON "_CoachToSimulator"("A", "B");

-- CreateIndex
CREATE INDEX "_CoachToSimulator_B_index" ON "_CoachToSimulator"("B");

-- AddForeignKey
ALTER TABLE "_EventToSimulator" ADD CONSTRAINT "_EventToSimulator_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSimulator" ADD CONSTRAINT "_EventToSimulator_B_fkey" FOREIGN KEY ("B") REFERENCES "Simulator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToEvent" ADD CONSTRAINT "_CoachToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToEvent" ADD CONSTRAINT "_CoachToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToSimulator" ADD CONSTRAINT "_CoachToSimulator_A_fkey" FOREIGN KEY ("A") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachToSimulator" ADD CONSTRAINT "_CoachToSimulator_B_fkey" FOREIGN KEY ("B") REFERENCES "Simulator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
