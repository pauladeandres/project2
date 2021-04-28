const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant.model')
const Dish = require('./../models/dish.model')
const uploadCloud = require('../config/cloudinary.js')
router.get('/', (req, res) => res.render('pages/restaurants/index')) //TODO

const { isLoggedIn, checkRoles } = require('./../middlewares')
const User = require('../models/user.model')


router.get('/map', (req, res) => res.render('pages/restaurants/map'))

router.get('/detail/:id', (req, res) => {

    const { id } = req.params

    Restaurant
        .findById(id)
        .populate('menu')
        .then(data => res.render('pages/restaurants/detail', data))
        .catch(err => console.log('Error!', err))
})

//router.use((req, res, next) => req.session.currentUser ? next() : res.redirect('/login'))


router.get('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => res.render('pages/restaurants/create-form'))

router.post('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => {
    let { name, profileImg, description, specialties } = req.body
    let id = req.session.currentUser._id
    console.log(id)
    Restaurant
        .create({ name, profileImg, description, specialties })
        .then((restaurant) => {
            console.log(restaurant._id)
            User.findById(id)
                .then(user => {
                    console.log(user)
                    user.restaurants.push(restaurant._id)
                    user.save()
                })
                .catch(err => console.log('error', err))
        })

        .then(res.redirect('/restaurants'))
        .catch(err => console.log('error', err))
})


router.get('/edit/:id', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    const { rest_id } = req.params.id

    Restaurant
        .findById(rest_id)
        .then(elem => res.render('pages/restaurants/edit-form', elem))
        .catch(err => console.log('Error!', err))
})



router.post('/edit/:id', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    const { id } = req.params
    const { name, profileImg, description, specialties } = req.body

    Restaurant.findByIdAndUpdate(id, { name, profileImg, description, specialties })
        .then(elem => {
            console.log(elem);
            res.redirect(`/restaurants/detail/${elem._id}`)
        })
        .catch(err => console.log('Error!', err))
})

router.post('/filter', (req, res) => {
    let availability = req.query.avail
    let specialties = req.query.spec
    let objQuery = {}



    if (availability && specialties) {
        objQuery = { availability, specialties }
        // Restaurant.find({ availability, specialties }).then(data => res.render('vista', data)).catch(err => console.log('Error!', err))
    } else if (availability) {
        objQuery = { availability }
        // Restaurant.find({ availability }).then(data => res.render('vista', data)).catch(err => console.log('Error!', err))
    } else {
        objQuery = { specialties }
        //Restaurant.find({ specialties }).then(data => res.render('vista', data)).catch(err => console.log('Error!', err))
    }

    Restaurant.find().populate('specialty').then(data => console.log(data)).catch(err => console.log('Error!', err))
})

//CREATE DISH

router.post('/my-restaurant/dish/:rest_id', uploadCloud.single('profileImg'), (req, res) => {
    const { rest_id } = req.params
    const { name, description, price } = req.body
    const profileImg = req.file.url

    Dish
        .create({ name, profileImg, description, price })
        .then((dish) => {
            Restaurant
                .findById(rest_id)
                .then((restaurant) => {
                    restaurant.menu.push(dish._id)
                    restaurant.save()
                })
                .catch(err => console.log('error', err))
        })
        .then(res.redirect(`/user/my-restaurant/${rest_id}`))
        .catch(err => console.log('error', err))
})

//CREAR DISPONIBILIDAD

router.post('/my-restaurant/availability/:rest_id', (req, res) => {
    const { rest_id } = req.params
    const { date, hour, places } = req.body

    Restaurant
        .findByIdAndUpdate(rest_id, { $push: { availability: { date, hour, places } } })
        .then((restaurant) => {
            // restaurant.availability.push({date, hour, places})
            // restaurant.save()
            console.log(restaurant)
        })
        .then(res.redirect(`/user/my-restaurant/${rest_id}`))
        .catch(err => console.log('error', err))
})

module.exports = router