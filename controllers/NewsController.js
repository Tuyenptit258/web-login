const path = require('path')
const produce = require('../models/produce')
class NewsController {
    index(req, res){
        //res.sendFile(path.join(__dirname,'search.html'))
        //res.json('hello')
        produce.find({}, function(err, produces){
            if(!err) res.json(produces)
            else res.status(400).json({err: 'ERROR'})

        })
    }

    index1(req,res){
        
   res.sendFile(path.join(__dirname,'register.html'))

    }
}

module.exports = NewsController