import { Router } from 'express'

const router = Router()

/**
 * Journeys
 */

router.get('/journey', (req, res) => {
  res.json({ message: 'hello' })
})

router.post('/journey', () => {})

/**
 * Stations
 */

router.get('/station', () => {});

router.get('/station/:id', () => {})

router.put('/station/:id', () => {})

router.post('/station', () => {})

router.delete('/station/:id', () => {})


export default router