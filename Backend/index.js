import express from 'express';
import { configDotenv } from 'dotenv';
import { connectDB } from './config/db.js';
import todoRoutes from './routes/todo.router.js';
configDotenv();
const app = express();

app.use(express.json());
app.use("/api/todos", todoRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  connectDB();
});

