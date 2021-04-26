const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const bcryptSalt = 10

const User = require('./../models/user.model')

router.get('/sign-up', (req, res) => res.render('pages/auth/sign-up'))

router.post('/sign-up', (req, res) => {
    const { username, passwd } = req.body

    if (username.length === 0 || passwd.length === 0) {
        res.render('pages/auth/sign-up', { errorMessage: 'Rellena los campos' })
        return
    }

    if (pwd.length < 2) {
        res.render('pages/auth/sign-up', { errorMessage: 'Elige una contraseña más segura, ¡merluzo!' })
        return
    }

    User.findOne({ username }).then(user => {
        if (user) {
            res.render('pages/auth/sign-up', { errorMessage: 'Rellena los campos' })
            return
        }

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(pwd, salt)


        User.create({ username, password: hashPass }).then(() => res.redirect('/'))
            .catch(err => console.log('error', err))
    })
        .catch(err => console.log('error', err))
})

router.get('/login', (req, res) => res.render('pages/login-form'))

// Login (post)
router.post('/login', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            console.log('Tengo aqui el usuario!', req.session)
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})


module.exports = auth