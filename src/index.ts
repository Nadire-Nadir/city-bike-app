import * as dotenv from 'dotenv'
import app from './server'

dotenv.config()

app.listen(8000, () => {
    console.log('hello on http://localhost:8000')
})