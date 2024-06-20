-- CreateTable
CREATE TABLE "DailySchedule" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DailySchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Times" (
    "id" TEXT NOT NULL,
    "time" DECIMAL(65,30) NOT NULL,
    "free" BOOLEAN NOT NULL,
    "dailyScheduleId" TEXT NOT NULL,

    CONSTRAINT "Times_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailySchedule_userId_day_key" ON "DailySchedule"("userId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Times_dailyScheduleId_time_key" ON "Times"("dailyScheduleId", "time");

-- AddForeignKey
ALTER TABLE "DailySchedule" ADD CONSTRAINT "DailySchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Times" ADD CONSTRAINT "Times_dailyScheduleId_fkey" FOREIGN KEY ("dailyScheduleId") REFERENCES "DailySchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
