import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

app.use(morgan('dev'))

// check if these needed in the future
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


export default app