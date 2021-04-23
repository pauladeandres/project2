
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    username: {
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
    profileImg: {
        type: String,
        default: ' '
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 500
},
    availability: {       
        gaps:  [{
            hora: new Date(),
            number_people: Number
        }]
    },
}, {
    timestamps: true
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant