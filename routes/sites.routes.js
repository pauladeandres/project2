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
                .then()
                .catch(err => console.log('Error!', err))
        }
    }

    res.redirect(`/user/my-restaurant/${id}`)

})



router.post('/check-spaces/:id', (req, res) => {

    const { id } = req.params
    const { date, hour } = req.body


    let dayFormat = date.concat('T22:00:00.000+00:00')

    console.log(dayFormat);


    Restaurant
        .findById(id)
        .populate({
            path: "availability",
            match: {
                hour,
                day: dayFormat
            }
        })
        .then(resp => {

            console.log(resp)
            res.render('pages/restaurants/finish-booking', { data: resp.availability[0], id })
        })
        .catch(err => console.log('Error!', err))
})


router.post('/booking-finished/:id', (req, res) => {

    const { id } = req.params

    const { place, hidden } = req.body

    let total = parseInt(hidden) - parseInt(place)

    Booking
        .findByIdAndUpdate(id, { sites: total })
        .then(()=>res.render('pages/restaurants/finished-booking'))
        .catch(err => console.log('Error!', err))
})

module.exports = router




const newForm = () => {

}