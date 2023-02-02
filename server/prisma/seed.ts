import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const journeysData = require('./data/journeys.json')
const stationsData = require('./data/stations.json')


async function main() {
    for (let journey of journeysData) {
        if (journey.coveredDistanceInMeter > 10 && journey.durationInSecond > 10) {
            await prisma.journey.create({
                data: journey
            })
        }
    }

    for (let station of stationsData) {
        await prisma.station.create({
            data: station
        })
    }

    await prisma.user.create({
        data: {
            username: 'supertestuser',
            password: 'supertestuser'
        }
    })
}


main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})
