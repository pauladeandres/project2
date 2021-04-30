
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    profileImg: {
        type: String,
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 500
    },

    specialties: [{
        type: Schema.Types.ObjectId,
        ref: 'Specialty',
        required: [true, 'Introduce tus especialidades']
    }],

    menu: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }],

    locationlat: {
        type: Number,
        required: true
    },
    locationlng: {
        type: Number,
        required: true
    },
    availability: [{
        type: Schema.Types.ObjectId,
        ref: 'SitesAvailable'
    }],
}, {
    timestamps: true
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant