const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    role: {
        type: String,
        enum: ['USER', 'RESTAURANT'],
        required: true
    },
    profileImg: {
        type: String,
        default: ' '
    },
    restaurantes: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User