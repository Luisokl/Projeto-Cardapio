import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import menuRoutes from './routes/menu.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/menu', menuRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar:', err));

app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));