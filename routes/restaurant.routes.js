const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant.model')
const Dish = require('./../models/dish.model')

router.get('/', (req, res) => res.render('pages/restaurants/index')) //TODO

const { isLoggedIn, checkRoles } = require('./../middlewares')


router.get('/map', (req, res) => res.render('pages/restaurants/map'))

router.get('/detail/:id', (req, res) => {

    const { id } = req.params

    Restaurant.findById(id).populate('menu').then(data => res.render('pages/restaurants/detail', data)).catch(err => console.log('Error!', err))
})

//router.use((req, res, next) => req.session.currentUser ? next() : res.redirect('/login'))


router.get('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => res.render('pages/restaurants/create-form'))

router.post('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => {
    let { name, profileImg, description, specialties } = req.body

    Restaurant.create({ name, profileImg, description, specialties }).then(() => res.redirect('/restaurants')).catch(err => console.log('error', err))
})


router.get('/edit/:id', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    const { rest_id } = req.params.id

    Restaurant.findById(rest_id).then(elem => res.render('pages/restaurants/edit-form', elem)).catch(err => console.log('Error!', err))
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



    if (availability && specialities) {
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

module.exports = router