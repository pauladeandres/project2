const express = require('express')
const router = express.Router()

// Endpoints
router.get('/details', (req, res) => res.render('pages/user/details'))


module.exports = router