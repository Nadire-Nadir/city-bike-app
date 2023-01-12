import express from 'express'

const app = express()

app.get('/', (req, res) => {
    console.log('Hello from express')
    res.status(200)
    res.json({ message: 'Hello' })
})

export default app