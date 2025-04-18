import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/db.js';

import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import couponRoutes from './routes/coupon.route.js'
// import paymentRoutes from './routes/payment.route.js'
import analyticsRoutes from './routes/analytics.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json({limit:"10mb"})) //to parse body 
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/coupons',couponRoutes)
// app.use('/api/payment',paymentRoutes)
app.use('/api/analytics',analyticsRoutes)

app.listen(PORT,()=>{
    console.log("server is running on http://localhost:"+ PORT)

    connectDB();
})
