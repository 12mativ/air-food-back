/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Coach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Coach` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coach_userId_key" ON "Coach"("userId");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
