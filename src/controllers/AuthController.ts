import {Request, Response} from 'express';
import {validationResult, matchedData} from 'express-validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';
import State from '../models/State'

export const signin = async (req:Request, res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()});
        return;
    }
    const data = matchedData(req);

    // procurar por email no banco de dados

    const user = await User.findOne({email:data.email});
    if(!user){
        res.json({error: 'email ou senha incorretos'});
        return;
    }

    //validando a senha

    const match = await bcrypt.compare(data.password, user.passwordHash as string);
    if(!match){
        res.json({error:'senha ou email incorretos'});
        return;
    }

    //gerar um novo token para a secção

    const payload = (Date.now()+Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);
    user.token = token;
    await user.save();
    res.json({token, email:data.email});
}
export const signup = async (req:Request, res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()});
        return;
    }
    const data = matchedData(req); // retorna os dados
    
    //verificando se email já existe
    const user = await User.findOne({
        email: data.email
    });
    if(user){
        res.json({
            erro:{email:{msg:'email já existe'}}
        });
        return;
    }

    //verificando se estado ja existe
    if(mongoose.Types.ObjectId.isValid(data.state)){
        const stateItem = await State.findById(data.state);
        if(!stateItem){
            res.json({
            error:{state:{msg:'Estado nao existe'}}
        });
    }
    } else {
        res.json({
        error:{state:{msg:'codigo de estado invalido'}}
    });
        return;
    };

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now()+Math.random()).toString();

    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
        name:data.name,
        email:data.email,
        passwordHash,
        token,
        state: data.state
    });
    await newUser.save();

    res.json({token});
}