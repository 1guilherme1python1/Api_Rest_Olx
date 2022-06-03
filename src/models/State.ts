import { model, Model, Schema, connection, Connection } from 'mongoose';

type UserType = {
    name:String
}

const schema = new Schema<UserType>({
    name:{type:String, required:true}
});

const modelName:string = 'State';

export default (connection && connection.models[modelName])?
    (connection.models[modelName] as Model<UserType>)
:
    model<UserType>(modelName, schema);