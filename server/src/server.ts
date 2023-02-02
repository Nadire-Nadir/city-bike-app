import express, { NextFunction, Request, Response } from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

// serving the react app
const root = require('path').join(__dirname, '..', 'build')
app.use(express.static(root))
app.get('*', (req, res) => {
    res.sendFile('index.html', (root))
})


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input!' })
    } else {
        res.status(500).json({ message: 'Something went wrong...' })
    }
})


export default app