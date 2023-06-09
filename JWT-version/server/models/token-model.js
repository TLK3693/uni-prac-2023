const {Schema, model} = require("mongoose");
//Храним ссылку на пользователя, в ref указываем на что мы ссылаемся 
const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    refreshToken: { 
        type: String, 
        required: true
    }
})

module.exports = model("Token", TokenSchema)