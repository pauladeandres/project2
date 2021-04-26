module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/restaurants', require('./restaurant.routes.js'))
    app.use('/auth', require('./auth.routes.js'))
}