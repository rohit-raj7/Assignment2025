

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB  from './config/db.js';
import router from './routes/routes.js';
import leadRoutes from './routes/lead.routes.js';
import uploadRoutes from './routes/upload.routes.js'

const app = express();


await connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'https://betterfronted.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API Working'));
app.use('/api/auth', router);
app.use('/api/agents',router);
app.use('/api/upload',uploadRoutes);
app.use('/api/leads',leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
