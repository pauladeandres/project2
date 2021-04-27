const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => {
    //req.app.locals.age = 23
    res.render('pages/index')
})


module.exports = router
