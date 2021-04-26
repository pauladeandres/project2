const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const bcryptSalt = 10

const User = require('./../models/user.model')

router.get('/sign-up', (req, res) => res.render('pages/auth/sign-up-form'))

router.post('/sign-up', (req, res) => {
    const { username, name, passwd, role, profileImg } = req.body

    console.log(req.body)

    if (username.length === 0 || passwd.length === 0) {
        res.render('pages/auth/sign-up-form', { errorMessage: 'Rellena los campos' })
        return
    }

    if (passwd.length < 2) {
        res.render('pages/auth/sign-up-form', { errorMessage: 'Elige una contraseña más segura, ¡merluzo!' })
        return
    }

    User.findOne({ username }).then(user => {
        if (user) {
            res.render('pages/auth/sign-up-form', { errorMessage: 'Rellena los campos' })
            return
        }

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(passwd, salt)


        User.create({ username, name, passwd: hashPass, role, profileImg }).then(() => res.redirect('/'))
            .catch(err => console.log('error', err))
    })
        .catch(err => console.log('error', err))
})

router.get('/login', (req, res) => res.render('pages/auth/login-form'))

// Login (post)
router.post('/login', (req, res) => {

    const { username, passwd } = req.body

    console.log(passwd, username)

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(passwd, user.passwd) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            console.log('Tengo aqui el usuario!', req.session)
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})


router.get('/logout', (req, res) => {
    req.session.destroy(err => res.redirect("/login"))
})



module.exports = router