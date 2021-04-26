const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
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
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Dish = mongoose.model("Dish", dishSchema)

module.exports = Dish