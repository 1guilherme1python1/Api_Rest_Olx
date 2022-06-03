import {checkSchema} from 'express-validator';

export const AuthValidator = {
    signup: checkSchema({
        name:{
            trim: true, //remove espaços
            isLength:{
                options:{min:2}
            }, 
            errorMessage:'Nome precisa ter pelo menos 2 caracteres'
        },
        email:{
            isEmail:true,
            normalizeEmail: true, //email todo minusuclo da um trim internamente
            errorMessage:"email invalido"
        }, 
        password:{
            isLength: {
                options:{min:2}
            },
            errorMessage: 'Senha precisa de ter pelo menos 2 caracteres'
        }, 
        state: {
            notEmpty: true,
            errorMessage: 'Estado nao preenchido'
        }
    }),
    signin:checkSchema({
        email:{
            isEmail:true,
            normalizeEmail: true, //email todo minusuclo da um trim internamente
            errorMessage:"email invalido"
        }, 
        password:{
            isLength: {
                options:{min:2}
            },
            errorMessage: 'Senha precisa de ter pelo menos 2 caracteres'
        }
    })
}