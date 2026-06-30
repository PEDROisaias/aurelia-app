import express from 'express';
import cors from 'cors';
import taskRoutes from './interfaces/routes/taskRoutes.js';
import diaryRoutes from './interfaces/routes/diaryRoute.ts';
import sosRoutes from './interfaces/routes/sosRoutes.ts';
import communicationRoutes from './interfaces/routes/communicationRoutes.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', diaryRoutes);
app.use('/api', sosRoutes);
app.use('/api', communicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Servidor da Aurélia rodando na porta ${PORT}`);
    
});