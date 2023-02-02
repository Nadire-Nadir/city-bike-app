import express, { NextFunction, Request, Response } from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import cors from 'cors'
import path from 'path'

const app = express()
app.use(cors())

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)


// serving the react app
app.use(express.static(path.join(__dirname, "..", "build")))

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input!' })
    } else {
        res.status(500).json({ message: 'Something went wrong...' })
    }
})


export default app