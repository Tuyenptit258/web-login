 const path = require('path')
 const spRouter = require('./sp')
 function route(app){
    app.use('/:slug', spRouter)
    
    
 }

 module.exports = route