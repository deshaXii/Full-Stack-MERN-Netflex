import express from 'express'
const app = express()
import mongoose from 'mongoose' 
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Backend database is running!")
}).catch(error => {
    console.log(error)
})

app.listen(5000, () => console.log("Backend server is running!"))