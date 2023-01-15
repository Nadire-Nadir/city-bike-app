import express, { NextFunction, Request, Response } from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    console.log('Hello from express')
    res.status(200)
    res.json({ message: 'Hello' })
})


app.use('/api', protect, router)

app.use('/user', createNewUser)
app.post('/signin', signin)


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input!' })
    } else {
        res.status(500).json({ message: 'Something went wrong...' })
    }
})


export default app