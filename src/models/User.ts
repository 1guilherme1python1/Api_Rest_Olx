import { model, Model, Schema, connection, Connection } from 'mongoose';

type UserType = {
    name:String, 
    email:String,
    state:String,
    passwordHash:String,
    token:String
}

const schema = new Schema<UserType>({
    name:{type:String, required:true},
    email:{type:String, required:true},
    state:{type:String, required:true},
    passwordHash:{type:String, requerid:true},
    token:{type:String, required:true}
});

const modelName:string = 'User';

export default (connection && connection.models[modelName]) ?
    (connection.models[modelName] as Model<UserType>)
    :
    model<UserType>(modelName, schema)
