const Produce = require('../models/produce')

const {mongooseToObject} = require('../unti/mongoose')


class spController {
    show(req,res,next) {
        
       // res.send('Ban qua dep trai luon - '+ req.params.slug )
        Produce.findOne({ slug: req.params.slug })
            .then(produce =>
                    res.render('sp.hbs',{produce: mongooseToObject(produce)})
            )
            .catch(next)
    }
    //[GET]
    creat(req,res,next) {
        res.render('creat.hbs')
    }

    //[POST]
    async store(req,res,next) {
       // res.json(req.body)
       const produce = new Produce(req.body)
       produce.save()
            .then( ()=> res.redirect('/'))
            .catch(error => {

            })
    }

}

module.exports = new spController()