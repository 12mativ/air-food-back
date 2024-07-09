/*
  Warnings:

  - A unique constraint covering the columns `[curriculumId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `curriculumId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "curriculumId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_curriculumId_key" ON "Student"("curriculumId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;
