const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')
const path = require('path')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/my_database");
app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.set('view-engine','ejs')
app.get('/', (req,res)=>{
    res.render('home.ejs')
})
app.get('/login',(req,res,)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})

app.post('/login', function(req,res,next){
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password

    })
    .then(data=>{
        if(data){
            var token  = jwt.sign({
                _id: data._id
            }, 'mk' )
            return res.json({
                message: 'thanh cong',
                token: token
            })
        } else{
            return res.status(300).json('Dang nhap that bai')
        }
    })
    .catch(err=>{
        res.status(500).json('Co loi ben server')
    })
})

app.get('/register',(req,res,)=>{
    res.sendFile(path.join(__dirname,'register.html'))
})

app.post('/register', function(req,res,next){
    var name = req.body.name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    AccountModel.findOne({
        username :username
    })
    .then(data=>{
        if(data){
            res.json('User nay da ton tai')
        }
        else{
            return AccountModel.create({
                name : name,
                email : email,
                username : username,
                password: password
            })
        }
    })
    .then(data=>{
        res.json('Tao tai khoan thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Tao tai khoan khong thanh cong')
    })
    
})


app.get('/private',(req,res,next)=>{
    try {

         var token = req.cookies.token
         var ketqua = jwt.verify(token,'mk')
        if(ketqua){
            next()
        }
    } catch (error) {
        return res.redirect('/login')
    }
}, (req,res,next)=>{
    res.json('welcome')
})
var accountRouter = require('./routers/account')
app.use('/api/account/', accountRouter)




app.listen(4000, ()=>{
    console.log('Start server on')
})