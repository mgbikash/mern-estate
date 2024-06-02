import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    });

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!!!`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
        process.exit(1);
    }
});

// app.get('/',(req,res)=>{
//     res.send("hello world!")
// })

// app.get('/testt',(req,res)=>{
//     // res.json("hello json!")
//     res.json({"testt":"testdata"})
// })

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Internal Server Error"

    return res.status(statusCode).json({
        succcess:false,
        statusCode,
        message,
    })
})
