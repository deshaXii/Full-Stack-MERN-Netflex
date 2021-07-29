import express from 'express'
const app = express()
import mongoose from 'mongoose' 
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import UsersRoute from './routes/users.js'
import MoviesRoute from './routes/movies.js'
import ListsRoute from './routes/lists.js'

dotenv.config()

mongoose.connect(process.env.DATABASE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Backend database is running!")
}).catch(error => {
    console.log(error)
})

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", UsersRoute)
app.use("/api/movies", MoviesRoute)
app.use("/api/lists", ListsRoute)




app.listen(5000, () => console.log("Backend server is running!"))