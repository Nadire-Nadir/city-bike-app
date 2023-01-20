import { NextFunction, Request, Response } from 'express'
import prisma from '../db'

export const createStations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stations = await prisma.station.create({
            data: {
                stationId: req.body.stationId,
                stationNameFi: req.body.stationNameFi,
                stationNameSe: req.body.stationNameSe,
                stationNameEn: req.body.stationNameEn,
                addressFi: req.body.addressFi,
                addressEn: req.body.addressEn,
                cityFi: req.body.cityFi,
                citySe: req.body.citySe,
                operator: req.body.operator,
                capacities: req.body.capacities,
                xCoordinate: req.body.xCoordinate,
                yCoordinate: req.body.yCoordinate
            }
        })

        res.json({ data: stations })

    } catch (e) {

        next(e)
    }
}


export const getStations = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const stations = await prisma.station.findMany();

        res.json({ data: stations })

    } catch (e) {

        next(e)
    }
}


export const getOneStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const station = await prisma.station.findUnique({
            where: {
                stationId: req.params.id
            }
        })

        res.json({ data: station })

    } catch (e) {

        next(e)
    }
}


export const updateStation = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const updated = await prisma.station.update({
            where: {
                stationId: req.params.id
            },
            data: {
                operator: req.body.operator,
                capacities: req.body.capacities
            }
        })

        res.json({ data: updated })

    } catch (e) {

        next(e)
    }
}


export const deleteStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await prisma.station.delete({
            where: {
                stationId: req.params.id
            }
        })

        res.json({ data: deleted })

    } catch (e) {

        next(e)
    }

}
