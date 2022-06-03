import {connect} from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export const mongoConnect = async ()=>{
    try {
        console.log('conectando ao mongoDB');
        await connect(process.env.MONGO_URL as string);
        console.log('conectando com sucesso ao mongoDB');
    } catch (error) {
        console.log('error na conexão ao mongoDB',error);
    }
}