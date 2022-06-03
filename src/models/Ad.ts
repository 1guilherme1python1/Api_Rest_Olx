import { model, Model, Schema, connection, Connection } from 'mongoose';

type UserType = {
    idUser:String, 
    state:String,
    category:String,
    images:[Object],
    dateCreated:Date,
    title:String,
    price:Number,
    priceNegotiable:boolean,
    description:String,
    views:Number,
    status:String
}

const schema = new Schema<UserType>({
    idUser:{type:String, required:true},
    state:{type:String, required:true},
    category:{type:String, required:true},
    images:[Object],
    dateCreated:{type:Date, required:true},
    title:{type:String, required:true},
    price:{type:Number, required:true},
    priceNegotiable:{type:Boolean, required:true},
    description:{type:String, required:true},
    views:{type:Number, required:true},
    status:{type:String, required:true},
});

const modelName:string = 'Ad';

export default(connection && connection.models[modelName])?
    (connection.models[modelName] as Model<UserType>)
:
    model<UserType>(modelName, schema)
