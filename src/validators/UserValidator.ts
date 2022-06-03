import {checkSchema} from 'express-validator';

export const UserValidator = {
    editAction: checkSchema({
        token:{
            notEmpty:true
        },
        name:{
            optional:true,
            trim: true, //remove espaços
            isLength:{
                options:{min:2}
            }, 
            errorMessage:'Nome precisa ter pelo menos 2 caracteres'
        },
        email:{
            optional:true,
            isEmail:true,
            normalizeEmail: true, //email todo minusuclo da um trim internamente
            errorMessage:"email invalido"
        }, 
        password:{
            optional:true,
            isLength: {
                options:{min:2}
            },
            errorMessage: 'Senha precisa de ter pelo menos 2 caracteres'
        }, 
        state: {
            optional:true,
            notEmpty: true,
            errorMessage: 'Estado nao preenchido'
        }
    })
}