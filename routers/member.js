const express = require('express')

var router = express.Router();
const MemberModel = require('../models/member');




// lay du lieu tu database
router.get('/member',(req,res,next)=>{
    MemberModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('loi Server')
    })
})
// tao vao database
router.post('/member',(req,res,next)=>{
    var name = req.body.name
    var age = req.body.age
    
    var address = req.body.address
    var email = req.body.email
    //var httt = req.body.httt
    
    MemberModel.create({
        name: name,
        age:age,
        address: address,
        email: email,
        
       // httt: httt
    })
    .then(data=>{
        res.json('them thong tin thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi Server')
    })
})

module.exports = router