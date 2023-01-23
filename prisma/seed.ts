import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const journeysData = require('./data/journeys-2021-05.json')
const stationsData = require('./data/stations.json')


async function main() {
    for (let journey of journeysData) {
        await prisma.journey.create({
            data: journey
        })
    }

    for (let station of stationsData) {
        await prisma.station.create({
            data: station
        })
    }
}


main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})
