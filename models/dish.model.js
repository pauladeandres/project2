const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    profileImg: {
        type: String,
        default: "https://d1s9hitrceb81w.cloudfront.net/default_image_5.jpg"
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