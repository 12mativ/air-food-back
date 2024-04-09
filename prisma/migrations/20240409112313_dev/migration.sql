-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'PILOT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" CHAR(60) NOT NULL,
    "roles" "Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
