const Member = require('../models/member')

const {mongooseToObject} = require('../unti/mongoose')


class mbController {
    
    //[GET]
    people(req,res,next) {
        res.render('muahang.hbs')
    }

    //[POST]
     members(req,res,next) {
       // res.json(req.body)
       const member = new Member(req.body)
       member.save()
       .then( ()=> res.redirect('/'))
       .catch(error => {

       })
    }

}

module.exports = new mbController()