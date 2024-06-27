import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';

dotenv.config({
  path: './.env'
});

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: '16kb' }));  // Data from form
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // Data from URL, extended is used for nested object
app.use(express.static('public')); // To store photos,icon
app.use(cookieParser());

// Routes declaration
app.use('/api/v1/users', userRouter);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
