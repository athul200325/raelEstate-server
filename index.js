import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import listRouter from './routes/listRouter.js'
import cors from 'cors'



dotenv.config()

mongoose.connect(process.env.MONGO)

.then(() => {
    console.log('Database connected successfully to MongoDB');
})
.catch(err => {
    console.log('Database connection error:', err);
});

const app = express()

app.use(cors());

// OR allow specific origins
app.use(
  cors({
    origin: 'https://real-estate-mngt-sys.vercel.app/', // Frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json())

app.listen(3000,()=>{
    console.log(`Server running on port 3000`);
    
})


app.use('/realestate/user',userRouter)
app.use('/realestate/auth',authRouter)
app.use('/realestate',listRouter)

app.use('/uploads',express.static('./uploads'))

app.use((err,req,res,next) => {
    const statusCode=err.statusCode|| 500;
const message = err.message||'Internal Server Error';
return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
    })
})