const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availableSchema = new Schema({
    sites: {
        type: Number,
        required: [true, 'Los sitios es obligatorios']
    },
    hour: {
        type: String,

    },

    day: {
        type: Date
    }
}, {
    timestamps: true
})

const SitesAvailable = mongoose.model("SitesAvailable", availableSchema)

module.exports = SitesAvailable


