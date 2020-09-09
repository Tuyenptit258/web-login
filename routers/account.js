const express = require('express')

var router = express.Router();
const AccountModel = require('../models/account');
const { deleteOne } = require('../models/account');



// lay du lieu tu database
router.get('/',(req,res,next)=>{
    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('loi Server')
    })
})
// tao vao database
router.post('/',(req,res,next)=>{
    var name = req.body.name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    
    AccountModel.create({
        name: name,
        email: email,
        username: username,
        password: password
    })
    .then(data=>{
        res.json('them  account thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi Server')
    })
})
// sua du lieu trong database
router.put('/:id',(req,res,next)=>{
    var id = req.params.id
    var newPassword = req.body.newPassword

    AccountModel.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then(data=>{
        res.json('sua thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})
// xoa du lieu trong database
router.delete('/:id', (req,res, next)=>{
    var id = req.params.id
    AccountModel.findByIdAndDelete({
        _id: id
    })
    .then(data=>{
        res.json('xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})
// lay 1 thoi
router.get('/:id', (req,res,next)=>{
    var id = req.params.id
    AccountModel.findById(id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('loi server')
    })
})




module.exports = router