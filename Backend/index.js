import express from 'express';
import { configDotenv } from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
configDotenv();
const app = express();

app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  connectDB();
});

