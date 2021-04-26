const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

router.get('/sign-up', (req, res) => res.render('pages/auth/sign-up'))

router.post('/sign-up', (req, res) => {
    const { username, passwd } = req.body


})

module.exports = auth