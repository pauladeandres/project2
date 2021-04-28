const express = require('express')
const router = express.Router()
const Specialty = require('./../models/specialty.model')

// Endpoints
router.get('/', (req, res) => {

    console.log(req.session.currentUser)
    res.render('pages/index')
})


module.exports = router
