import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { config } from 'dotenv';
config();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
import userRoutes from './routes/user.route.js';
import errorMiddleware from './middleware/error.middleware.js';

/**
 * Routes
 */


app.use('/api/v1/users', userRoutes);

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.get('*', (req, res) => {
    res.send('oops page not found!')
})

export default app;