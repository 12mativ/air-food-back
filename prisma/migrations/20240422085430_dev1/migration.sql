/*
  Warnings:

  - Added the required column `email` to the `Pilot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pilot" ADD COLUMN     "email" TEXT NOT NULL;
