const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const realObjectId = mongoose.Types.ObjectId

const Specialty = require('./../models/specialty.model')
const Restaurant = require('./../models/restaurant.model')
const Dish = require('./../models/dish.model')

const uploadCloud = require('../config/cloudinary.js')

router.get('/', (req, res) => res.render('pages/restaurants/index')) //TODO

const { isLoggedIn, checkRoles } = require('./../middlewares')
const User = require('../models/user.model')

//VISTA MAPA
router.get('/map', (req, res) => res.render('pages/restaurants/map'))

//VISTA LISTA RESTAURANTES
router.get('/list', (req, res) => {
    Restaurant
        .find()
        .then(data => res.render('pages/restaurants/result', { data }))
        .catch(err => console.log('Error!', err))
})

//DETALLES RESTAURANTE
router.get('/detail/:id', (req, res) => {

    const { id } = req.params

    Restaurant
        .findById(id)
        .populate('menu')
        .then(data => res.render('pages/restaurants/detail', data))
        .catch(err => console.log('Error!', err))
})

//router.use((req, res, next) => req.session.currentUser ? next() : res.redirect('/login'))


router.get('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    Specialty
        .find()
        .then(specialties => res.render('pages/restaurants/create-form', { specialties }))
        .catch(err => console.log('Error!', err))
})


router.post('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    let { name, profileImg, description, specialties, locationlat, locationlng } = req.body
    let id = req.session.currentUser._id

    Restaurant
        .create({ name, profileImg, description, specialties, locationlat, locationlng })
        .then(restaurant => User.findByIdAndUpdate(id, { $push: { restaurants: restaurant._id } }))
        .then(response => console.log(response))
        .catch(err => console.log('Error!', err))

})

//EDITAR RESTAURANTE
router.get('/edit/:id', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    const { rest_id } = req.params.id

    Restaurant
        .findById(rest_id)
        .then(elem => res.render('pages/restaurants/edit-form', elem))
        .catch(err => console.log('Error!', err))
})

//EDITAR RESTAURANTE
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
    // let availability = req.query.avail
    // let specialties = req.query.spec
    // let objQuery = {}

    let specArr = []
    let objQuery = []
    let conditionQuery = ""

    if (Array.isArray(req.body.id) == true) {
        specArr.push(...req.body.id)
        conditionQuery = "$and: "
    } else if (Array.isArray(req.body.id) == false && req.body.id) {
        specArr.push(req.body.id)
    } else if (!req.body.id) {

    }



    //{$and:[{specialties: ObjectId('60897e8f8ff4b591e6d02304')},{specialties: ObjectId('60897e8f8ff4b591eda02304')}]}

    specArr.forEach(elm => {
        objQuery.push({
            specialties: new realObjectId(elm)
        })
    })

    let finalQuery
    if (objQuery.length > 1) {
        finalQuery = { $and: [...objQuery] }
    } else {
        finalQuery = objQuery[0]
    }

    Restaurant
        .find(finalQuery)
        .populate("specialties menu")
        .then(data => {
            res.render('pages/restaurants/result', { data })
        })
        .catch(err => console.log('Error!', err))
})
// console.log(objQuery)


// if (availability && specialties) {
//     objQuery = { availability, specialties }
//     // Restaurant.find({ availability, specialties }).then(data => res.render('vista', data)).catch(err => console.log('Error!', err))
// } else if (availability) {
//     objQuery = { availability }
//     // Restaurant.find({ availability }).then(data => res.render('vista', data)).catch(err => console.log('Error!', err))
// } else {
//     objQuery = { specialties }
//     //Restaurant.find({ specialties }).then(data => res.render('vista', data)).catch(err => console.log('Error!', err))
// }


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

//RESERVAR

router.get('/reservation/:rest_id', (req, res) => {

    const { rest_id } = req.params

    Restaurant
        .findById(rest_id)
        .then(elem => res.render(`pages/restaurants/reservation`, elem))
        .catch(err => console.log('Error!', err))
})

module.exports = router