import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';
import 'dotenv/config';

const app = express();

app.use(cookieParser());


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(router);

await mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("_____Connected_____")
})

app.listen(process.env.PORT);

