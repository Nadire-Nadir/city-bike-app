-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "stationId" TEXT NOT NULL,
    "stationNameFi" TEXT NOT NULL,
    "stationNameSe" TEXT NOT NULL,
    "stationNameEn" TEXT NOT NULL,
    "addressFi" TEXT NOT NULL,
    "addressEn" TEXT NOT NULL,
    "cityFi" TEXT NOT NULL,
    "citySe" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "capacities" INTEGER NOT NULL,
    "xCoordinate" DOUBLE PRECISION NOT NULL,
    "yCoordinate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("stationId")
);

-- CreateTable
CREATE TABLE "Journey" (
    "journeyId" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "departureStationId" TEXT NOT NULL,
    "departureStationName" TEXT NOT NULL,
    "returnTime" TIMESTAMP(3) NOT NULL,
    "returnStationId" TEXT NOT NULL,
    "returnStationName" TEXT NOT NULL,
    "coveredDistanceInMeter" INTEGER NOT NULL,
    "durationInSecond" INTEGER NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("journeyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Journey_departureStationId_key" ON "Journey"("departureStationId");

-- CreateIndex
CREATE UNIQUE INDEX "Journey_returnStationId_key" ON "Journey"("returnStationId");
