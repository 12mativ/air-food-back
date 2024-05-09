/*
  Warnings:

  - You are about to drop the column `surname` on the `Coach` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coach" DROP COLUMN "surname",
ADD COLUMN     "middleName" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "middleName" TEXT;
