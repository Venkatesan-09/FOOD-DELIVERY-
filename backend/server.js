import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/UserRoute.js'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/orderRoute.js'
//import 'dotenv/config.js'

//app config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174'
  ].filter(Boolean),
  credentials: true
}))

//DB connection
connectDB();

//api endpoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use("/api/user",userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port,()=>{
  console.log(`server started on http://localhost:${port}`);
})

