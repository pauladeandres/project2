const express = require('express')
const router = express.Router()

const Booking = require('./../models/sitesAvailable.model')
const Restaurant = require('./../models/restaurant.model')


router.post('/manage-local/:id', (req, res) => {
    let hours = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    const { sites } = req.body
    const { id } = req.params

    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()
    let dayNow = today.getDate()

    for (let i = 0; i < 30; i++) {
        for (let x = 0; x < hours.length; x++) {

            let hour = hours[x]
            let day = new Date(year, month, dayNow + i)

            Booking
                .create({ sites, hour, day })
                .then(bookings => Restaurant.findByIdAndUpdate(id, { $push: { availability: bookings._id } }))
                .catch(err => console.log('Error!', err))
        }
    }

})

module.exports = router