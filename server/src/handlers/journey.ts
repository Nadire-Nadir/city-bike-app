import { NextFunction, Request, Response } from 'express'
import prisma from '../db'


export const getJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const journeys = await prisma.journey.findMany();

        res.json(journeys)

    } catch (e) {
        next(e)
    } 
}


export const createJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const journey = await prisma.journey.create({
            data:
            {
                departureTime: req.body.departureTime,
                departureStationId: req.body.departureStationId,
                departureStationName: req.body.departureStationName,
                returnTime: req.body.returnTime,
                returnStationId: req.body.returnStationId,
                returnStationName: req.body.returnStationName,
                coveredDistanceInMeter: req.body.coveredDistanceInMeter,
                durationInSecond: req.body.durationInSecond
            }
        })

        res.json(journey)

    } catch (e) {
        next(e)
    }  
}

export const countJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const journeyNumberFrom = await prisma.journey.count({
            where: {
                departureStationId: req.body.id,
            }
        })

        const journeyNumberTo = await prisma.journey.count({
            where: {
                returnStationId: req.body.id
            }
        })

        res.json({
            'departureJourneyNum': journeyNumberFrom,
            'returnJourneyNum': journeyNumberTo
        })
    } catch (e) {
        next(e)
    }
}

export const avgJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const avgJourneyFrom = await prisma.journey.aggregate({
            where: {
                departureStationId: req.body.id
            },
            _avg: {
                coveredDistanceInMeter: true
            }
        })

        const avgJourneyTo = await prisma.journey.aggregate({
            where: {
                returnStationId: req.body.id
            },
            _avg: {
                coveredDistanceInMeter: true
            }
        })

        res.json({
            'avgJourneyFrom': avgJourneyFrom,
            'avgJourneyTo': avgJourneyTo
        })
    } catch (e) {
        next(e)
    }
}
