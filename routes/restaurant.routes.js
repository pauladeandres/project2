const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/restaurant.model')

router.get('/', (req, res) => res.render('pages/restaurants/index'))

//router.get('/map') TODO
""
router.get('/detail', (req, res) => {

    const { id } = req.params

    Restaurant.findById(id).populate('menu').then(data => res.render('pages/restaurants/detail', data)).catch(err => console.log('Error!', err))
})

//router.use((req, res, next) => req.session.currentUser ? next() : res.redirect('/login'))


router.get('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => res.render('pages/restaurants/create-form'))

router.post('/create', isLoggedIn, checkRoles('OWNER'), (req, res) => {
    let { name, profileImg, description, specialties } = req.body

    Restaurant.create({ name, profileImg, description, specialties }).then(() => res.redirect('/restaurants')).catch(err => console.log('error', err))
})


router.get('edit/:id', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    const { rest_id } = req.params

    Restaurant.findById(rest_id).then(elem => res.render('pages/restaurants/edit-form', elem)).catch(err => console.log('Error!', err))
})

router.post('edit/:id', isLoggedIn, checkRoles('OWNER'), (req, res) => {

    const { rest_id } = req.params
    const { name, profileImg, description, specialties } = req.body

    Restaurant.findByIdAndUpdate(rest_id, { name, profileImg, description, specialties }).then(elem => {
        res.redirect(`/restaurants/details/${elem._id}`)
    }).catch(err => console.log('Error!', err))
})