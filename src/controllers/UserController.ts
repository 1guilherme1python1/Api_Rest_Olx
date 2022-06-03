import {Request, Response} from 'express';
import State from '../models/State';
import User from '../models/User';
import Category from '../models/Category';
import Ad from '../models/Ad';
import { validationResult, matchedData } from 'express-validator';
import brcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const info = async (req:Request, res:Response)=>{
    let {token} = req.query; // A requisição e do tipo GET logo os parametros estarão na query
    const user = await User.findOne({token});
    const state = await State.findById(user?.state);
    const ads = await Ad.find({idUser: user?._id.toString()});

    let adList = [];
    for(let i in ads){
        const cat = await Category.findById(ads[i].category);
        adList.push({
            id:ads[i].id,
            status:ads[i].status,
            images:ads[i].images,
            dateCreated: ads[i].dateCreated,
            title:ads[i].title,
            price:ads[i].price,
            priceNegotiable: ads[i].priceNegotiable,
            description: ads[i].description,
            views: ads[i].views,
            category: cat?.slug
        })
    }

    res.json({
        name:user?.name,
        email: user?.email,
        state: state?.name,
        ads:adList
    });
}
export const editAction = async (req:Request, res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.mapped()});
        return;
    }
    const data = matchedData(req);

    const user = await User.findOne({token:data.token});
    if(user){
    if(data.name){
        user.name = data.name;
    }
    if(data.email){
        const emailCheck = await User.findOne({email: data.email});
        if(emailCheck){
            res.json({error: 'email já existe'});
            return;
        }
        user.email = data.email;
    }

    if(data.state){
        if(mongoose.Types.ObjectId.isValid(data.state)){
        const stateCheck = await State.findById(data.state);
        if(!stateCheck){
            res.json({error: 'estado não existe'});
            return;
            }
        user.state = data.state;
    } else {
        res.json({error: 'estado não existe'});
        return;
    }
    }
    if(data.password){
        user.passwordHash = await brcrypt.hash(data.password, 10);
    }
    await user.save();
    }
    res.json({success:'atualizado!'});
}
export const getState = async (req:Request, res:Response)=>{
    let states = await State.find({});
    res.json({states});
}