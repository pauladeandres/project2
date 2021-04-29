const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isUser, isOwner } = require('./../utils')

const User = require('./../models/user.model')
const Restaurant = require('./../models/restaurant.model')
const Dish = require('./../models/dish.model')

// DETALLES USUARIO
router.get('/details/:user_id', (req, res) => {

    const {user_id} = req.params

    User
    .findById(user_id)
    .populate('restaurants')
    .then(user => 
        res.render('pages/user/my-details', { user, isOwner: isOwner(req.session.currentUser)}))
        //console.log(user))
    .catch(err => console.log('Error!', err))
})

//DETALLES RESTAURANTE

router.get('/my-restaurant/:rest_id', (req, res) => {

    const {rest_id} = req.params

    Restaurant
    .findById(rest_id)
    .populate('menu')
    .then(restaurant => 
        res.render('pages/user/my-restaurant-details', {restaurant}))
    .catch(err => console.log('Error!', err))
})

//CREATE DISH

router.post('/my-restaurant/dish/:rest_id', (req, res) => {
    const { rest_id } = req.params
    const { name, profileImg, description, price } = req.body

    if (profileImg == ' ') {
        profileImg = 'https://d1s9hitrceb81w.cloudfront.net/default_image_5.jpg'
    }
 
    console.log(req.body)

    Dish
        .create({ name, profileImg, description, price })
        .then(dish => Restaurant.findByIdAndUpdate(rest_id, { $push: { menu: dish._id } }))
        .then(() => res.redirect(`/user/my-restaurant/${rest_id}`))
        .catch(err => console.log('error', err))
})


module.exports = router