
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

    specialties: {
        type: String,
        enum: ['pizza', 'hamburguer', 'sushi', 'chinese', 'veggie', 'japanese', 'poke', 'dessert', 'spanish', 'italian', 'tapas', 'pasta', 'kebab', 'mexican', 'salad', 'indian'],
        required: true
    },

    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }],

    availability: {
        gaps: [{
            time: Date,
            number_people: Number
        }]
    },
}, {
    timestamps: true
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant