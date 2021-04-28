const express = require('express');
const Dish = require('../models/dish.model.js');
const Restaurant = require('../models/restaurant.model.js');
const User = require('../models/user.model.js');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/restaurants', require('./restaurant.routes.js'))
    app.use('/auth', require('./auth.routes.js'))
    app.use('/user', require('./user.routes.js'))
    
}