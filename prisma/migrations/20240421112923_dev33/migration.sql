/*
  Warnings:

  - You are about to drop the `Airplane` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_airplaneId_fkey";

-- DropTable
DROP TABLE "Airplane";

-- DropTable
DROP TABLE "Flight";
