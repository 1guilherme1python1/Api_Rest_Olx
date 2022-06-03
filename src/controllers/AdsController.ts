import {Request, Response} from 'express';
import Category from '../models/Category';
import User from '../models/User';
import Ad from '../models/Ad';
import sharp from 'sharp';
import { unlink } from 'fs/promises';


export const getCategories = async (req:Request, res:Response)=>{
    const cats = await Category.find({});
    let categories = [];

    for(let i in cats){
        
        categories.push({
            id: cats[i]._id,
            name: cats[i].name,
            slug: cats[i].slug,
            img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
        });
    }

    res.json({categories});
}

export const addAction = async (req:Request, res:Response)=>{
    let {title, price, priceneg, desc, cat, token} = req.body;

    const user = await User.findOne({token});

    if(user){
        // if(!title || !cat){
        //     res.json({error: 'titulo ou categoria não forma preenchidos'});
        //     return;
        // }
        // if(price){
        //     price = price.replace('.', '').replace(',', '.').replace('R$', '');
        //     price = parseFloat(price);
        // } else {
        //     price = 0;
        // }
        // var newAd = await Ad.create({
        // status:true,
        // idUser: user._id,
        // state: user.state,
        // dataCreated: new Date(),
        // title,
        // category : cat,
        // price,
        // priceNegotiable: (priceneg == 'true') ? true : false,
        // description: desc,
        // views:0   
        // });

        if(req.files){
            let arquivos = req.files;
            console.log(arquivos[]);
            return;
        // for(let i in arquivos){
        //     console.log(arquivos[i]);
        // }
            
        // await sharp(req.file.path)
        // .resize(200, 200)//(largura, altura)
        // .toFormat('jpeg')
        // .toFile(`./public/media/${req.file.filename}.jpg`);

        // await unlink(req.file.path);

        // res.json({sucesso: 'arquivo enviar com sucesso'});
        }
    // res.json({newAd});
    // return;
    }
    res.json({error: 'usuario não encontrado'})
}

export const getList = (req:Request, res:Response)=>{
    res.json({})
}

export const getItem = (req:Request, res:Response)=>{
    res.json({})
}

export const editAction = (req:Request, res:Response)=>{
    res.json({})
}