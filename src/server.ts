import express,{Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import {mongoConnect} from './database/mongo';
import apiRouter from './routes/api'

dotenv.config();

mongoConnect();

const server = express();

server.use(cors({
    origin:'*'
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended:true}));

server.use(apiRouter);

server.use((req:Request, res:Response)=>{
    res.status(404);
    res.json({error: 'rota não encontrada'})
});


server.listen(process.env.PORT, ()=>{
    console.log('esta rodando');
});


