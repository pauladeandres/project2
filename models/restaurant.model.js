
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({

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

    // specialities: {[
    //     pizza: { type: Boolean, required: true, default: false },
    //     hamburguer: { type: Boolean, required: true, default: false },
    //     sushi: { type: Boolean, required: true, default: false },
    //     chinese: { type: Boolean, required: true, default: false },
    //     veggie: { type: Boolean, required: true, default: false },
    //     japanese: { type: Boolean, required: true, default: false },
    //     poke: { type: Boolean, required: true, default: false },
    //     dessert: { type: Boolean, required: true, default: false },
    //     spanish: { type: Boolean, required: true, default: false },
    //     italian: { type: Boolean, required: true, default: false },
    //     tapas: { type: Boolean, required: true, default: false },
    //     pasta: { type: Boolean, required: true, default: false },
    //     kebab: { type: Boolean, required: true, default: false },
    //     mexican: { type: Boolean, required: true, default: false },
    //     salad: { type: Boolean, required: true, default: false },
    //     indian: { type: Boolean, required: true, default: false }
    // ]},


    specialties: {
        type: [String],
        enum: ['pizza', 'hamburguer', 'sushi', 'chinese', 'veggie', 'japanese', 'poke', 'dessert', 'spanish', 'italian', 'tapas', 'pasta', 'kebab', 'mexican', 'salad', 'indian'],
        required: true
    },

    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }],

    availability:  [{
            hour: String,
            date: Date,
            places: Number
        }]
    ,
}, {
    timestamps: true
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant