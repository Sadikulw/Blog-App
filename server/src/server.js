import "dotenv/config";
import express from 'express' 
import userRoute from './routes/userRoute.js'
import blogRoute from './routes/blogRoute.js'
import commentRoute from './routes/commentRoute.js'
import connectDB from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
//middleware
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-client-0c3t.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use('/api/users', userRoute)
app.use('/api/blogs', blogRoute) 
app.use('/api/comments', commentRoute )
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 5000
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
