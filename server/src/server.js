import express from 'express' 
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import blogRoute from './routes/blogRoute.js'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use('/api/users', userRoute)
app.use('/api/blogs', blogRoute) 
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 5000
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
