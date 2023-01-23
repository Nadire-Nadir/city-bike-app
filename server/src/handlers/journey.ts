import { NextFunction, Request, Response } from 'express'
import prisma from '../db'


export const getJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const journeys = await prisma.journey.findMany();

        res.json({ data: journeys })

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

        res.json({ data: journey })

    } catch (e) {
        next(e)
    }  
}