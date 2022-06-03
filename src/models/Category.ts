import { model, Model, Schema, connection, Connection } from 'mongoose';

type UserType = {
    name:String, 
    slug:String
}

const schema = new Schema<UserType>({
    name:{type:String, required:true},
    slug:{type:String, required:true}
});

const modelName:string = 'Category';
export default(connection && connection.models[modelName])?
    (connection.models[modelName] as Model<UserType>)
    :
    model<UserType>(modelName, schema)
