import { PrismaClient } from '@prisma/client'
import { journeys } from './journeys'
const journeyData = require('./data/journeys-2021-05.json')


const prisma = new PrismaClient()

const journey = {
    departureTime: "",
    departureStationId: "",
    departureStationName: "",
    returnTime: "",
    returnStationId: "",
    returnStationName: "",
    coveredDistanceInMeter: 1,
    durationInSecond: 2
}

async function main() {
    for (let journey of journeyData) {
        await prisma.journey.create({
            data: journey
        })
    }
}

main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})
