import { Router } from 'express'
import { body } from 'express-validator'
import { avgJourneys, countJourneys, createJourneys, getJourneys } from './handlers/journey'
import { createStations, deleteStation, getOneStation, getStations, updateStation } from './handlers/station'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Journeys
 */

router.get('/journey', getJourneys)

router.post('/journey', createJourneys)

router.post('/journey/count', countJourneys)

router.post('/journey/avg', avgJourneys)

/**
 * Stations
 */
router.post('/station', createStations)

router.get('/station', getStations)

router.get('/station/:id', getOneStation)

router.put('/station/:id',
    body('operator').isString(),
    body('capacities').isInt(),
    handleInputErrors,
    updateStation
)

router.delete('/station/:id', deleteStation)


export default router